# Main file
import pandas as pd
import numpy as np
from get_score import get_score_column
from create_JSON import df_to_JSON
import random
import json


path_to_JSON = "../data_to_leaflet/data.json"

JSON_object = df_to_JSON(df_final, path_to_JSON)

