#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar  6 11:48:02 2020

@author: kateka
"""

import pandas as pd

reports = pd.read_csv("BIPMetadata_cleaned.csv")
terms = pd.read_csv("terms.csv")

#%%
document_id = []
for row in terms.iterrows():
    index = reports.loc[reports['title'] == row[1].ReportTitle].index
    if len(index) == 0:
        document_id.append(0)
    else:
        document_id.append(index[0] + 1)

terms["document_id"] = document_id
terms = terms[terms.document_id != 0]
#%%
terms.to_csv("terms_cleaned.csv", index=False)
