## PRIDE Submission Tool

The PRIDE Submission Tool is the main tool used to submit the proteomics experiment to [PRIDE Archive](http://wwww.ebi.ac.uk/pride/archive/). This tool has been implemented as a Wizard, guiding the submitter trougth a set of simple steps to build the final submission.

## Login Panel

The first step to submit a dataset to PRIDE Archive is to log into PRIDE using an existing account as shown:

</br>

![Login panel](../static/markdown/pridesubmissiontool/files/login-page.png)

## Submission Details

The user is asked to provide some basic details about the uploaded dataset such as the title, a list of keywords (in a comma separated format), and a brief description of the data (similar to the abstract of the corresponding publication) a sample processing and a data processing protocol.

The user also picks a mass spectrometry experiment type from a drop-down menu.

</br>

![Project description](../static/markdown/pridesubmissiontool/files/project-description.png)

## Add Files and assign file types

In this stage, you should choose the files you would like submit. You can add files by clicking on the highlighted button.

![Add files](../static/markdown/pridesubmissiontool/files/add-files.png)

> Depending on the [files provided](./pridefileformats) and the type of submission, the tool will try to link the relation between files and also the file
type.

### Complete Submissions based on mzIdentML


When a Complete submission is performed based on mzIdentMLs files. The dataset should contains at least one PEAK list associated with the mzIdentML (identification file).

![Add files](../static/markdown/pridesubmissiontool/files/file-relations-1.png)

The Submission tool will automatically detect the _Type_ of the File (e.g. RAW, PEAK, RESULT, SEARCH). In the case of ‘PEAK’ files, the tool will check and validate that all the required file(s) that were referenced in the mzIdentML file’s <SpectraData> element are present.

> Note: If your peak list files had an extension recognized by the tool (.mgf , .dta, .ms2, .pkl) then the tool will automatically annotate the type as ‘PEAK’ but in other cases you have to assign the file type yourself.

For instance, .mzXML files, are recognized by the tool as them as ‘PEAK’ files by default but.


If you are adding a spectral library file, then please assign the file type manually as these files might come in many different flavors, for instance as .msp, .splib or .nist files.

> Note: You can provide in Complete submissions the corresponding SEARCH files from the search engines in addition to the result files (e.g. the Mascot .dat files)


### Complete Submissions based on mzTab

Complete Submissions based on mzIdentML only contains the identified peptides/proteins and the corresponding spectra used to identified them. However, most of the shotgun proteomics experiments are _Quantitative_ experiments.

For Quantitative Complete experiments the user should provide using [mzTab files](./pridefileformats#result_files)


## Assign relationships between the submitted files

This mapping step consist of assigning the relations between the ‘RESULT’ files and the other types of files included in the submission, for example, which ‘RAW’ (mandatory), ‘PEAK’ (mandatory for mzIdentML and mztab), ‘SEARCH’, ‘QUANT’, ‘FASTA’, ‘SPECTRUM_LIBRARY’, ‘GEL’ or ‘OTHER’ files can be linked to a given ‘RESULT’ file or are associated with it.

This will enable others users to understand how your data is connected and structured.

![Add files](../static/markdown/pridesubmissiontool/files/file-relations-2.png)


> By default, the tool makes an attempt to generate the mapping between the ‘RESULT’ and the other - most importantly ‘RAW’ - files.
For instance, if there has been only 1 ‘RESULT’ file found during the previous ‘Add Files’ step then all the other files will be mapped to this ‘RESULT’ file.
If there are multiple ‘RESULT’ files the tool maps the other files – ‘RAW’, ‘PEAK’, ‘SEARCH’, … - with the same file name prefix, but without the file extension, to the corresponding ‘RESULT’ files. This mapping is done even if the suffix part of the ‘RAW’ files contains different numbers (for instance indicating different replicates).

If the automatic mapping is partial only or does not apply, the submitter is asked to manually assign the relationships between the files.

## Additional submission metadata

Additional metadata need be provided for each ‘RESULT’ file in the case of a ‘Complete’ submission, and what is needed is the same for both subtypes of submissions (mzTab and mzIdentML).

![Annotate Result Files](../static/markdown/pridesubmissiontool/files/annotate.png)

Previous figure shows the screen where the _‘Annotate’_ button can be clicked for each ‘RESULT’ file. This information is usually imported automatically in the case of a mzTab file (if the recommended CVs/ontologies are used). For mzIdentML, the information needs to be manually annotated.

The following additional metadata is **Mandatory**:
 - Species: The species, where the experiment was performed.
 - Tissue: Tissue (not applicable should be used in case of cell line experiments).
 - Instrument information.

![Annotate Result Files](../static/markdown/pridesubmissiontool/files/annotate-2.png)

Each of these information should be provided in Controlled Vocabulary (CV) terms from a drop-down menu. Optionally, providing information about the _cell type_, _disease_ and _quantification method_ (if applicable) is recommended.

> Note: If you have more than one ‘RESULT’ file, as it is usually the case, then you can pick the ‘Apply to all’ box for species and tissue information instead of doing this many times.


In the majority of the cases you will find the metadata annotation you are looking for in the drop-down menu since the elements of the drop-down menus have been selected based on frequency. Sometimes the annotation you are looking for is not going to be available from the drop-down lists.
If that’s the case, you have to select to the OLS (Ontology Lookup Service) panel and search for the annotation you want to provide.
For the more extensive search you need to click on the “other” options on the bottom of the drop-down menu. For instance, if you have samples from
e.g. the fish Grayling (Thymallus thymallus) the species is not available from the drop-down list menu. You have to click on _Other species_ and search for Thymallus thymallus in the OLS panel.


![OLS Client](../static/markdown/pridesubmissiontool/files/ols-client.png)

## Last steps


### Providing contact details for the Lab Head

![Add Lab Head](../static/markdown/pridesubmissiontool/files/la-head.png)
 
### Optional metadata annotation

In this panel, it is recommended to provide additional metadata in four cases:

-	Your dataset is part of a bigger project/effort (for instance the Human Proteome Project or the EU project ‘PRIME-XS’). It is a way to tag your dataset to enable grouping of datasets this way.
-	There is already a PubMed ID associated with it (the data has been already published).
-	Your dataset represents a reanalysis of an earlier public PX dataset.
-	There are other “omics” datasets (for instance transcriptomics, metabolomics data present in other repositories) that can be associated with it. In this case, please provide the accession number of the dataset in the corresponding repository.


![Additional Information](../static/markdown/pridesubmissiontool/files/additionals.png)
 
### Check before submission

This is the last step before the file upload actually starts. You should double-check that all the necessary files are included in the submission summary before continuing to the upload step, see an example of an mzIdentML based ‘complete’ submission.


![Check Before Submission](../static/markdown/pridesubmissiontool/files/check-final.png)

 
## File Submission

This is the actual step when all your files are uploaded to PRIDE and ProteomeXchange. Once the upload is finished, an e-mail will be sent to you to confirm that all your files have been uploaded successfully and that are waiting to be validated. If for any reason the tool crashes at this point, the PX Submission Tool can be restarted and the file upload will restart in the same point before it crashed.

By default, the PX submission Tool (since version 2.1) is using the fast Aspera upload transfer protocol with which terabytes can be potentially transferred within a day. Aspera functionality usually provides much faster file transfer speeds than FTP (typically up to 50 times). Should there be any issues with the Aspera upload (probably due to the Internet/ data transfer local settings), submitters can always switch to the slower FTP file transfer protocol by changing the ‘px.upload.protocol = aspera’ line to ‘px.upload.protocol = ftp’ in the plain config.props text file located in the ‘config’ subdirectory in the PX Submission Tool’s working directory. You will be also issued with a temporary submission reference,
to help us to quickly identify and track your submission should you have any questions. This is not the PX accession number.
