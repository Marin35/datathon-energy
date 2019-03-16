# Main file
import pandas as pd
import numpy as np
from get_score import get_score_column
from create_JSON import df_to_JSON
import random
import json

# Load the data, that will be the dataframe to be output to JSON
df_final = pd.read_csv("../data_to_leaflet/df_test_commune.csv", sep=';', header=0)

#Load another dataframe:

df_master = pd.read_csv("../data/Master_file_v2.csv", sep=',', header=0)


# We select only relevant scores.
df_master = df_master[['NOM_COM', 'Sol_mean', 'Vent_mean', 'nb_borne_e', 'Prop_prote']]


df_master = df_master.rename(columns={'NOM_COM': 'Nom commune'})


# Merge it and drop the duplicates.
df = pd.merge(df_final, df_master, how='left', on=['Nom commune'])
df = df.drop_duplicates(subset='Nom commune')

# Get the score with the ranking.
n = len(df.columns)
columns_name = df.columns
for i in range(3, n):
    column_name = columns_name[i]
    df = get_score_column(df, column_name)

# Rename the columns here.

# Fill the NAs with zeros
df = df.fillna(value=0)


# Add a Final Score ponderated by each individuals score.
number_scores = 5 # To be changed
# Weighted vector is the number of scores.
weighted_vector = np.empty(number_scores)
for i in range(len(weighted_vector)):
    weighted_vector[i] = 1. / number_scores

total_score = np.zeros(len(df))
for j in range(len(weighted_vector)):
    print(weighted_vector[j])
    total_score += weighted_vector[j] * df.iloc[:, j + 2]

df['Score Total'] = total_score

# Output it to a JSON format.
path_to_JSON = "../data_to_leaflet/data.json"
JSON_object = df_to_JSON(df, path_to_JSON)  # Write the JSON object into the path.

