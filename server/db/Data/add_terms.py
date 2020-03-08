#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar  6 11:48:02 2020

@author: kateka
"""

import pandas as pd
import re

#%%

reports = pd.read_csv("BIPMetadata_current.csv")
terms = pd.read_csv("terms.csv").dropna()

#%%

# source: https://stackoverflow.com/questions/9662346/python-code-to-remove-html-tags-from-a-string
def cleanhtml(raw_html):
    cleanr = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext

terms['TermDefinition'] = terms['TermDefinition'].map(cleanhtml)
#%%

reportGroups = terms.groupby('ReportTitle').groups.items()
termTitles = []
termDefs = []
reportTitles = []
for group in reportGroups:
    title = group[0]
    indices = group[1]
    section = terms.loc[indices]
    termTitles.append(section.TermTitle.str.cat(sep='::'))
    termDefs.append(section.TermDefinition.str.cat(sep='::'))
    reportTitles.append(title)
    
terms_cleaned = pd.DataFrame({
        'TermTitle': termTitles,
        'TermDefinition': termDefs,
        'ReportTitle': reportTitles})

#%%

document_id = []
for row in terms_cleaned.iterrows():
    index = reports.loc[reports['title'] == row[1].ReportTitle].index
    if len(index) == 0:
        document_id.append(0)
    else:
        document_id.append(index[0] + 1)

terms_cleaned["document_id"] = document_id
terms_cleaned = terms_cleaned[terms_cleaned.document_id != 0]

#%%
terms_cleaned.to_csv("terms_concat.csv", index=False)
