# Create the function to JSON.
import json


def get_lat(x):
    """Function to each cell to get lat."""
    lat, lon = x.split(',')
    return float(lat)


def get_lon(x):
    lat, lon = x.split(',')
    return float(lon)


def df_to_JSON(df_final, path_to_JSON):

    df_to_JSON = df_final.copy()
    t = df_final["Geo Point 2D"]
    df_to_JSON["lat"] = t.apply(get_lat)
    df_to_JSON["lon"] = t.apply(get_lon)

    df_to_JSON = df_to_JSON.drop(columns=["Geo Point 2D"])
    df_to_JSON = df_to_JSON.set_index("Nom commune")

    d = df_to_JSON.to_dict(orient='index')
    #JSON = json.dumps(d, indent=4)
    JSON = json.dumps(d)

    with open(path_to_JSON, 'w') as outfile:
        json.dump(JSON, outfile)

    return JSON


# Use "sed 's/\\//g' data_JSON" to remove the escape character when creating the file.