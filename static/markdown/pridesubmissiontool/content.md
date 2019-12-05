## PRIDE Submission Tool

The PRIDE Submission Tool is the main tool used to submit proteomics datasets to [PRIDE Archive](http://wwww.ebi.ac.uk/pride/archive/). This tool has been implemented as a wizard, guiding submitters through a set of simple steps to complete each dataset submission.

[DOWNLOAD TOOL](http://ftp.pride.ebi.ac.uk/pride/resources/tools/submission-tool/latest/desktop/px-submission-tool.zip)

## Login Panel

The first step to submit a dataset to PRIDE Archive is to log into PRIDE using an existing account as shown:

</br>

![Login panel](../static/markdown/pridesubmissiontool/files/login-page.png)

## Submission Details

Users are asked to provide some basic details about the uploaded dataset such as the title, a list of keywords (in a comma separated format), and a brief description of the dataset (similar to the abstract of the corresponding publication), a sample processing and a data processing protocol.

Additionally, users have to pick a mass spectrometry experiment type from a drop-down menu.

</br>

![Project description](../static/markdown/pridesubmissiontool/files/project-description.png)

## Add Files and assign file types

In this stage, you should choose the files to be submitted. Files can be added by clicking on the highlighted button.

![Add files](../static/markdown/pridesubmissiontool/files/add-files.png)

> Depending on the [files provided](./pridefileformats) and the type of submission, the tool will try to link the relation between files and also the file type.

### Complete Submissions based on mzIdentML files

When a Complete submission is performed using mzIdentML files, the dataset should contains at least one 'PEAK' list associated with the mzIdentML (identification file).

![Add files](../static/markdown/pridesubmissiontool/files/file-relations-1.png)

The Submission tool will automatically try to detect the _Type_ of the File (e.g. 'RAW', 'PEAK', 'RESULT', 'SEARCH'). In the case of ‘PEAK’ files, the tool will check and validate that all the required file(s) that were referenced in the mzIdentML file’s <SpectraData> element are included.

> Note: If your peak list files had an extension recognized by the tool (.mgf , .dta, .ms2, .pkl) then the tool will automatically annotate the type as ‘PEAK’ but in other cases you have to assign the file type yourself.

For instance, .mzXML files, are recognized by the tool as ‘PEAK’ files by default but.


If you are adding a spectral library file, then please assign the file type manually as these files might come in many different flavours, for instance as .msp, .splib or .nist files.

> Note: In Complete submissions you can provide the corresponding 'SEARCH' files from the search engines in addition to the 'RESULT' files (e.g. Mascot .dat files)

### Complete Submissions based on mzTab files

Complete Submissions based on mzIdentML only contain the identified peptides/proteins and the corresponding spectra. However, most of the shotgun proteomics experiments are _Quantitative_ experiments.

For Quantitative Complete experiments, users should ideally provide this information using [mzTab files](./pridefileformats#result_files). The dataset should contains at least one 'PEAK' list associated with the mzTab file.


## Assign the relationships between the submitted files

This mapping step consists on assigning the relations between the ‘RESULT’ files and the other types of files included in the submission, for example, which ‘RAW’ (mandatory), ‘PEAK’ (mandatory for mzIdentML and mzTab), ‘SEARCH’, ‘QUANT’, ‘FASTA’, ‘SPECTRUM_LIBRARY’, ‘GEL’ or ‘OTHER’ files can be linked to a given ‘RESULT’ file or are associated with it.

This will enable others users to understand how your data is connected and structured.

![Add files](../static/markdown/pridesubmissiontool/files/file-relations-2.png)


> By default, the tool makes an attempt to generate the mapping between the ‘RESULT’ and the other - most importantly ‘RAW’ - files.
For instance, if there is only 1 ‘RESULT’ file found during the previous ‘Add Files’ step then all the other files will be mapped to this ‘RESULT’ file.
If there are multiple ‘RESULT’ files the tool maps the other files – ‘RAW’, ‘PEAK’, ‘SEARCH’, … - with the same file name prefix, but without the file extension, to the corresponding ‘RESULT’ files. This mapping is done even if the suffix part of the ‘RAW’ files contains different numbers (for instance indicating different replicates).

If the automatic mapping is partial only or does not apply, the submitter is asked to manually assign manually the relationships between the files.

## Additional submission metadata

Additional metadata need be provided for each ‘RESULT’ file in the case of a **Complete** submission, and what is needed is the same whether mzTab or mzIdentML files are used.

![Annotate Result Files](../static/markdown/pridesubmissiontool/files/annotate.png)

The previous figure shows a screenshot where the _‘Annotate’_ button can be clicked for each ‘RESULT’ file. This information is usually imported automatically in the case of a mzTab file (if the recommended Controlled Vocabularies/ontologies are used). For mzIdentML files, the information needs to be annotated manually.

The following additional metadata is **Mandatory**:
 - Species: The species of the samples used in a given dataset.
 - Tissue: Tissue ("not applicable" should be used in case other types of experiments are performed).
 - Instrument information (mass spectrometer).

![Annotate Result Files](../static/markdown/pridesubmissiontool/files/annotate-2.png)

Each of this pieces of information should be provided using CV terms from a drop-down menu. Optionally, providing information about the _cell type_, _disease_ and _quantification method_ (if applicable) is recommended.

> Note: If you have more than one ‘RESULT’ file then you can pick the ‘Apply to all’ box for replicating species and tissue information (if applicable) instead of replicating this information many times.


In most cases the metadata annotation you may be looking for can be available in the drop-down menu, since the elements of the drop-down menus have been selected based on frequency of these terms in existing datasets. However, sometimes the annotations you are looking for may not be available from the drop-down lists.

If that’s the case, you have to select the OLS (Ontology Lookup Service) panel and search for the corresponding annotation you want to provide. In the case of the more extensive searches you need to click on the “other” options on the bottom of the drop-down menu. For instance, if you have samples coming from e.g. the fish Grayling (Thymallus thymallus) this species name is not available from the drop-down list menu. You have to click on _Other species_ and search for 'Thymallus thymallus' in the OLS panel.


![OLS Client](../static/markdown/pridesubmissiontool/files/ols-client.png)

## Last steps

### Providing contact details for the Lab Head

![Add Lab Head](../static/markdown/pridesubmissiontool/files/la-head.png)
 
### Optional metadata annotation

In this panel, it is recommended to provide additional metadata in the following four cases:

-	Your dataset is part of a bigger 'umbrella' project/effort (for instance the Human Proteome Project or the EU project ‘PRIME-XS’). It is a way to tag your dataset to enable grouping of datasets this way.
-	There is already a PubMed ID associated with it (the data has been already published).
-	Your dataset represents a re-analysis which reuses an earlier publicly available ProteomeXchangeX dataset.
-	There are other “omics” datasets (for instance transcriptomics, metabolomics data, among others) present in other repositories that can be associated with the proteomics dataset (for instance, they have been generated in the same study). In this case, please provide the accession number of the dataset in the corresponding repository.

![Additional Information](../static/markdown/pridesubmissiontool/files/additionals.png)
 
### Check before submission

This is the last step before the file upload process actually starts. You should double-check that all the necessary files are included in the submission summary before continuing to the upload step. See below an example of an mzIdentML based ‘Complete’ submission.

![Check Before Submission](../static/markdown/pridesubmissiontool/files/check-final.png)

## File Upload

This is the actual step when all your files are uploaded to PRIDE (as part of ProteomeXchange). Once the upload is finished, an e-mail will be sent to you to confirm that all your files have been uploaded successfully and that they are waiting to be validated. If for any reason the tool crashes at this point, the Submission Tool can be restarted and the file upload will attempt to restart in the same point before it did.

By default, the submission Tool (since version 2.1) is using the faster Aspera upload transfer protocol with which terabytes can be potentially transferred within a day. Aspera functionality usually provides much faster file transfer speeds than FTP (typically up to 50 times). Should there be any issues with the Aspera upload (probably due to the Internet/ data transfer local settings in your Institute/University), the tool will automatically try to perform the file upload using FTP.

You will be also issued with a temporary submission reference to help us to quickly identify and track your submission should you have any questions. **This is not the final PXD dataset identifier**.
