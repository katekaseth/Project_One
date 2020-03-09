#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar  6 15:23:24 2020

@author: kateka
"""

import pandas as pd

def convert_to_sql(df, file_name):
    for i, col in enumerate(df.columns):
        if df.dtypes[i] != "int64":
            df[col] = "'" + df[col] + "'"
    sql = ""
    for row in df.iterrows():  
        sql = sql + "(" + row[1][df.columns[0]] 
        for i in range(len(df.columns)):
            if i != 0:
                sql = sql + "," + str(row[1][df.columns[i]])
            
        sql = sql + "),\n"
    sql = sql[:len(sql)-2]
    file = open(file_name, 'w')
    file.write(sql)
    file.close()
    return sql
#%%
    
terms = pd.read_csv("terms_cleaned.csv")
sql = convert_to_sql(terms, 'terms_sql.txt')

#%%