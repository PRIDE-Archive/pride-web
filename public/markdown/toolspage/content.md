##PRIDE Tools

## Submission Tool

The [PRIDE Submission Tool](./pridesubmissiontool) is the main tool used to submit the proteomics datasets to [PRIDE Archive](wwww.ebi.ac.uk/pride/archive/). This tool has been implemented as a wizard, guiding the submitter trough a set of simple steps to complete each individual data submission.


## PRIDE Inspector Toolsuite

The [PRIDE Inspector Toolsuite](./prideinspector) is the main tool used to review and download the proteomics data from [PRIDE Archive](wwww.ebi.ac.uk/pride/archive/). The stand-alone tool provides different panels or view focuses on a particular aspect of the data. There are currently six views:

- _Overview_ view – shows experimental metadata

- _Protein_ view – shows protein identifications

- _Peptide_ view – shows peptides used to generate the protein identifications

- _Spectrum_ view – shows spectra and chromatograms

- _Quantification_ view – show quantitative data for both proteins and peptides

- _Summary charts_ view – provides data chars for assessing data quality

Next to the previous six layers, a generic application management framework maintains the context and information shared by the whole environment. It consists of features frequently required by medium or large Java Swing based applications, such as: lifecycle services for background tasks, in-memory caching, event bus, user property management and error handling. The framework is independent from the PRIDE Inspector and therefore can be reused for other rich client applications.

## PRIDE Utilities

[Libraries and Algorithms](./prideutilities) supporting the functionality provided by PRIDE.

## PRIDE Archive API

The [PRIDE Archive API](www.ebi.ac.uk/pride/ws/archive) (Restful WS Service) provides a way to retrieve the data from PRIDE Archive programatically. The corresponding documentation can be [found here](http://pride-archive.github.io/PrideAPIDocs).
