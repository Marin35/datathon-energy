# Calculate the score of the index of each dataframe
# Assign the score A+ for the top 20%, A for 30%, B for 30% and C for 20%


def get_score_column(df, column_name):
    """
    Get the score of the dataframe based on the column name.
    """
    # Get the rank of the consumption.
    rank = 'Rank' + column_name
    df[rank] = df[column_name].rank()
    df['Score ' + column_name] = ((df.shape[0] + 1 - df[rank]) / df.shape[0]) * 100
    df_2 = df.copy()
    df_2 = df.drop(columns=rank)

    return df_2




