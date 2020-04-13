import pandas as pd
import re

data = pd.read_csv("BIPMetadata_current.csv")

def format_date(date_column):
    # formatting the date data to display as yyyy-mm-dd
    new_dates = []
    for date in date_column:
        month = date[0:date.find('/')]
        date = date[date.find('/')+1:]
        day = date[0:date.find('/')]
        year = date[date.find('/')+1:]

        if (len(month) == 1):
            month = "0" + month
        if (len(day) == 1):
            day = "0" + day
        if (len(year) == 2):
            year = "20" + year
        newDate = year + "-" + month + "-" + day
        
        print(newDate)
        new_dates.append(newDate)
    return new_dates


def truncate(column, length):
    # truncates given column to given length and returns new column
    new_d = []
    for d in column:
        if (len(d) > length):
            d = d[0:length]
        new_d.append(d)
    return new_d


# source: https://stackoverflow.com/questions/9662346/python-code-to-remove-html-tags-from-a-string
def cleanhtml(column):
    new_desc = []
    for d in column:
        cleanr = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
        cleantext = re.sub(cleanr, '', d)
        new_desc.append(' '.join(cleantext.split()))
    return new_desc


def remove_spaces(column):
    new_sql = []
    for d in column:
        new_sql.append(' '.join(d.split()))
    return new_sql


new_created = format_date(data["created"])
print("UPDATAED")
new_updated = format_date(data["updated"])
new_query = remove_spaces(data["sql_query"])
new_query = truncate(new_query, 5000)
new_description = truncate(data["description"], 500)
new_description = cleanhtml(new_description)


data["created"] = new_created
data["updated"] = new_updated
data["sql_query"] = new_query
data["description"] = new_description


data.to_csv("BIPMetadata_cleaned.csv", index=False)