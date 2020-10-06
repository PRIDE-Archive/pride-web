## pridepeptidomews

For each cluster, we offer a detailed summary page where you can view the key statistics and quliaty metrics of a cluster.

## pridepeptidomews

A spectrum cluster is a group of Mass Spec spectra that share the same characteristics, namely the shapes of their peaks. The spectra that are similar are grouped together in the PRIDE Cluster pipeline.

## Species chart

The original spectrum comes from PRIDE Archive, which is a submission based data repository.

Due the diversity of PRIDE Archive submissions, we have spectrum from a large number of species and also covers many post translational modifications.

In order to keep the data submitted to us save and secure, we only take the public experiments into account for running the PRIDE Cluster production pipeline.



## Modification chart

The current release of the PRIDE Cluster API is version 1. To find out more about this version, please refer to its documentaiton.

## Web browsable API

The PRIDE Cluster RESTful API is web browsable, which means that:

The query results returned by the API are available in JSON format. This ensures that they can be viewed by human and accessed programmatically by computer.

The main RESTful API page provides a simple web-based user interface, which allows developers can familiarise themselves with the API and get a better sense of the PRIDE Cluster data before writing single line of code.

## Versioning

To ensure that changes in the PRIDE Cluster API don't break the applications relying on it, the API is versioned, and the version is included in the API's URL.

No backward-incompatible changes are made to each version after it's been made public. More specifically, it's guaranteed that within one version there will be no:

changing urls
deleting or renaming data fields
changing data field types
The following non-disruptive changes may be implemented to a public API:

adding new endpoints
adding new data fields
adding new filtering methods
An advance notice will be given before obsoleting an API version. To stay up to date, please consider signing up for the PRIDE Twitter account.

## API version 1 documentation


## Implementation
