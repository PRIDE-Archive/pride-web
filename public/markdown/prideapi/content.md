## PRIDE Database API Documentation

The PRIDE Database API is a powerful tool for accessing programmatically and interacting with the PRIDE Archive, a public data repository for mass spectrometry data. This document provides an overview of the most relevant endpoints and how to programmatically access them.

The base URL for the PRIDE Database API is: https://www.ebi.ac.uk/pride/ws/archive/v2


### Retrieving projects 

The projects endpoint enables to retrieve information about projects.  
```
Endpoint: /projects
HTTP Method: GET
```
Example: https://www.ebi.ac.uk/pride/ws/archive/v2/projects?pageSize=100&sortDirection=DESC&sortConditions=submissionDate

### Retrieving project details

To retrieve the project details, the following endpoint must be called: 

```
Endpoint: /projects/{id}
HTTP Method: GET
id (required): The unique identifier of the project.
```

Example: https://www.ebi.ac.uk/pride/ws/archive/v2/projects/PXD046193

### Searching for Projects

```
Endpoint: /search/projects
HTTP Method: GET
```

Example: https://www.ebi.ac.uk/pride/ws/archive/v2/search/projects?q=human&sortDirection=DESC&sortConditions=submissionDate

### pridepy: A Python Client for PRIDE Rest API

The pridepy Python Client library for PRIDE Rest API 

# Installation
To install, simply use `pip`:

```bash
$ pip install --upgrade pridepy
```

### Conclusion

This document provides an overview of the PRIDE Database API and its available endpoints. You can use these endpoints to programmatically access PRIDE Archive data for your research or applications. For more detailed information, consult the official [PRIDE Database API documentation](https://www.ebi.ac.uk/pride/ws/archive/v2).