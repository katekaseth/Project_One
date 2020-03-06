import pandas as pd

data = pd.read_csv("BIPMetadata.csv")


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
        newDate = year + "-" + month + "-" + day
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


def remove_tags(column):
    # Remove html tags from given column and returns new column
    new_description = []
    for d in column:
        d = d.replace("&nbsp;", " ")
        to_remove = ["<p>", "<br>", "<br />", "</p>",
                     "</u>", "<u>", "</span>", "<span>", "&ldquo;", "&rdquo;"]
        for tag in to_remove:
            d = d.replace(tag, '')
        new_description.append(' '.join(d.split()))
    return new_description


def remove_spaces(column):
    new_sql = []
    for d in column:
        new_sql.append(' '.join(d.split()))
    return new_sql


new_created = format_date(data["created"])
new_updated = format_date(data["updated"])
new_query = remove_spaces(data["sql_query"])
new_query = truncate(new_query, 5000)
new_description = truncate(data["description"], 500)
new_description = remove_tags(new_description)

data["created"] = new_created
data["updated"] = new_updated
data["sql_query"] = new_query
data["description"] = new_description

data.to_csv("BIPMetadata_cleaned.csv", index=False)
