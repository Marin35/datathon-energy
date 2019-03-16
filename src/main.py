# Main file
import pandas as pd
import numpy as np
from get_score import get_score_column

print("hello world")

# Load the data
df_p = pd.read_csv("../data/production-electrique-par-filiere-a-la-maille-region.csv", sep=';', header=0)
df_p = df_p.loc[df_p['Année'] == 2017]  # Get only year 2017

# We drop the duplicates for regions
df_p = df_p.drop_duplicates(subset='Nom région')

# We select only relevant regions.
df_p = df_p[['Nom région', 'Code région', 'Nb sites Photovoltaïque Enedis', 'Energie produite annuelle '
                                                                            'Photovoltaïque Enedis (MWh)']]

df_2 = df_p.copy()  # Set a copy for the division.
df_2['Moyenne energie produite Enedis'] = df_p['Energie produite annuelle Photovoltaïque Enedis (MWh)'] / df_p[
    'Nb sites Photovoltaïque Enedis']


# Do the same with the consumption in France by region
df_c = pd.read_csv("../data/consommation-electrique-par-secteur-dactivite-region.csv", sep=';', header=0)
df_c = df_c.loc[df_c['Année'] == 2017]  # Get only year 2017
df_c = df_c.drop_duplicates(subset='Nom région')
df_c = df_c[['Nom région', 'Code région', 'Conso moyenne Résidentiel (MWh)']]

# Get the consumption and the production.
df_test = pd.merge(df_c, df_2, how='left', on=['Nom région'])

# Save the dataframe created:
df_test.to_csv("../data_created/df_test_region.csv", sep=';', encoding='utf-8', index=False)


df = pd.read_csv("../data_created/df_test_region.csv", sep=';', header=0, index_col=False)
df = df.dropna()

# Use the function get score to obtain the score of the index.
get_score_column(df, 'Conso moyenne Résidentiel (MWh)')
get_score_column(df, 'Moyenne energie produite Enedis')

df_scores = df[['Nom région', 'Score Conso moyenne Résidentiel (MWh)', 'Score Moyenne energie produite Enedis']]

df_scores.to_csv("../data_to_leaflet/df_test_region.csv", sep=';', encoding='utf-8', index=False)