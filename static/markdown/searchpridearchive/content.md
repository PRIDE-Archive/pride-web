## Dataset search in PRIDE Archive

## Basic term-based search

In order to perform a term-based search, a term or a set of terms have to be entered in the search box in the top-right part of the page. Each term will be treated as separate search term. That is, the search results will include projects that match any of the search terms.

The higher the number of terms matched, the more relevant the result of the search will be. If a set of terms should be considered as a single unit, double quotes must be used (for example: "label free" will only match projects where the whole experssion could be matched rather than matching projects with 'label' and/or 'free').

</br>

![Login panel](../../static/markdown/searchpridearchive/files/search-terms.png)

The search accepts terms for dataset identifiers (PX datasets or PRIDE assay/experiment numbers), PubMed identifiers, sample details (e.g. organisms, organism part, diseases), instruments, post-translational modifications and any word/phrase included in the title or description of a dataset.

Dataset tags, for instance biomedical, cardiovascular, metaproteomics, are particular terms displayed in different colours on the particular released dataset page and in the search results. Their main aim is to help organise and connect datasets together thereby making targeted search more powerful. When searching for a tag name in the search box on the PRIDE Archive web page, the search engine will prioritise the tagged datasets and return them first. See our dedicated 'PRIDE dataset tags' page to learn how to interact with dataset tags in order to browse/search/interrogate PRIDE data.

## What happens

The search terms will be matched against the records in PRIDE Archive and a list of project summaries, if any records match, will be shown as a result. A project summary includes the following default information:

- Project accession (dataset identifier)
- Project Title
- Project description (shortened)
- Organism
- Project publication date

If the terms match a word that is not included in those properties, the user can see where they match by collapsing the _Matched Items_ option:

![Login panel](../../static/markdown/searchpridearchive/files/matched-items.png)

## Highlighting

Highlighting provides search results feedback to the PRIDE Archive user. The pieces of information that matched the search will appear highlighted in the search results.


## Sorting criteria for search results

The default sorting is done by relevance. That is, by how relevant a project may be considering the search terms provided. At present, the relevance is affected by several fields, from more to less important:

- Project accession
- Title
- Relevance
- Submission Date
- Publication Date

Apart from the relevance, it is possible to sort search results by accession, title, and date. Clicking a sort criteria twice will invert the sort order.


## Browsing all PRIDE Archive projects

To browse all PRIDE Archive results is equivalent to performing a basic search with no search terms. It will return the whole list of public projects available in PRIDE Archive. The same filter and sorting mechanisms as for a basic search apply.

## Filtering
Through filtering we can ensure some information to be present in our search results. When a certain filter is active, all the search results shown will pass that filter. For example, if a filter is active specifying that the species has to be 'Homo Sapiens (Human)' all the resulting projects will carry this species annotation (although a project could have more than one species annotation). The available filters types are:

- Organism
- Organism Part
- Diseases
- Modification
- Instrument
- Experiment Type

When one of the filter types is selected, the second drop-down list will be populated with the available values for that filter type.

![Login panel](../../static/markdown/searchpridearchive/files/filtering.png)

Multiple filters, of the same or differnt types, can be added. They are cumulative under an AND condition. That is, the search results must pass all the filters (and not just one of them). For example applying filters for 'Homo Sapiens (Human)' and 'Mus musculus (Mouse)' will only list results that have been annotated with both species. Filters can be removed in any order and the results are updated accordingly.


## Private data

**Only public data can be searched. Private data is only available for viewing onces logged in, but it is not available via the search.**
