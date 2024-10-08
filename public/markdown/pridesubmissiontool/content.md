## PRIDE Submission Tool

The PRIDE Submission Tool (also know as PX Submission Tool) is the main tool used to submit proteomics datasets to [PRIDE Archive](https://www.ebi.ac.uk/pride/archive/). This tool has been implemented as a wizard, guiding submitters through a set of simple steps to complete each dataset submission.

[DOWNLOAD TOOL](https://ftp.pride.ebi.ac.uk/pub/databases/pride/resources/tools/submission-tool/latest/desktop/px-submission-tool.zip)

PRIDE Submission Tool is a Java based application and requires Java 8 or higher to run. The tool is available for Windows, Mac and Linux operating systems. The latest version of the tool is releasd on a zip file. Inside the zip file a folder with a jar file and a lib folder is present. The lib folder contains all the required libraries for the tool to run. The jar file is the executable file for the tool. The tool can be run by double clicking on the jar file or by running the following command in the terminal.

    java -jar px-submission-tool-{version}.jar

If you are using MacOS, you may need to change the privacy and security settings as below:

</br>

![PRIDE Submission Tool panel](../markdown/pridesubmissiontool/files/macos-security.png)

Below are the steps for using the PRIDE submission tool or PX tool

## Login Panel

To submit a dataset to PRIDE Archive, log into PRIDE using an existing account with email and password as shown:

</br>

![Login panel](../markdown/pridesubmissiontool/files/login-page.png)

## Submission Details

Users are asked to provide some basic details about the uploaded dataset such as the title, a list of keywords (in a comma separated format), and a brief description of the dataset (similar to the abstract of the corresponding publication), a sample processing and a data processing protocol.

Additionally, users have to pick a mass spectrometry experiment type from a drop-down menu.

</br>

![Project description](../markdown/pridesubmissiontool/files/project-description.png)

## Add Files and assign file types

In this stage, you should choose the files to be submitted. Files can be added by clicking on the "Add files" button on the top left side of px tool, highlighted.

Note : It is recommended to name your file in a self descriptive way, for instance : experimentname_samplename_replicates_fractions. We only accept A-Za-z0-9_. in file names. Please remove any other special characters from your file name.

![Add files](../markdown/pridesubmissiontool/files/add-files.png)

> Depending on the [files provided](./pridefileformats) and the type of submission, the tool will try to link the relation between files and also the file type.

### Complete Submissions based on mzIdentML files

When a Complete submission is performed using mzIdentML files, the dataset should contains at least one 'PEAK' list associated with the mzIdentML (identification file).

![Add files](../markdown/pridesubmissiontool/files/file-relations-1.png)

The Submission tool will automatically try to detect the _Type_ of the File (e.g. 'RAW', 'PEAK', 'RESULT', 'SEARCH'). In the case of ‘PEAK’ files, the tool will check and validate that all the required file(s) that were referenced in the mzIdentML file’s <SpectraData> element are included.

> Note: If your peak list files had an extension recognized by the tool (.mgf , .dta, .ms2, .pkl) then the tool will automatically annotate the type as ‘PEAK’ but in other cases you have to assign the file type yourself.

For instance, .mzXML files, are recognized by the tool as ‘PEAK’ files by default but.


If you are adding a spectral library file, then please assign the file type manually as these files might come in many different flavours, for instance as .msp, .splib or .nist files.

> Note: In Complete submissions you can provide the corresponding 'SEARCH' files from the search engines in addition to the 'RESULT' files (e.g. Mascot .dat files)

### Complete Submissions based on mzTab files

Complete Submissions based on mzIdentML only contain the identified peptides/proteins and the corresponding spectra. However, most of the shotgun proteomics experiments are _Quantitative_ experiments.

For Quantitative Complete experiments, users should ideally provide this information using [mzTab files](./pridefileformats#result_files). The dataset should contains at least one 'PEAK' list associated with the mzTab file.

## Checksum calculation

You have the option of calculating checksum for the files added. Please
press yes or no if you want to calculate checksum. It is highly recommended to calculate checksum but if the file is very large you can skip or pass through checksum calculation
by pressing no. Please press Next button after that.


## Additional submission metadata

Additional metadata need be provided for each ‘RESULT’ file in the case of a **Complete** submission, and what is needed is the same whether mzTab or mzIdentML files are used.

![Annotate Result Files](../markdown/pridesubmissiontool/files/annotate.png)

The previous figure shows a screenshot where the _‘Annotate’_ button can be clicked for each ‘RESULT’ file. This information is usually imported automatically in the case of a mzTab file (if the recommended Controlled Vocabularies/ontologies are used). For mzIdentML files, the information needs to be annotated manually.

The following additional metadata is **Mandatory**:
 - Species: The species of the samples used in a given dataset.
 - Tissue: Tissue ("not applicable" should be used in case other types of experiments are performed).
 - Instrument information (mass spectrometer).

![Annotate Result Files](../markdown/pridesubmissiontool/files/annotate-2.png)

Each of this pieces of information should be provided using CV terms from a drop-down menu. Optionally, providing information about the _cell type_, _disease_ and _quantification method_ (if applicable) is recommended.

> Note: If you have more than one ‘RESULT’ file then you can pick the ‘Apply to all’ box for replicating species and tissue information (if applicable) instead of replicating this information many times.


In most cases the metadata annotation you may be looking for can be available in the drop-down menu, since the elements of the drop-down menus have been selected based on the frequency of these terms in existing datasets. However, sometimes the annotations you are looking for may not be available from the drop-down lists.

If that’s the case, you have to select the OLS (Ontology Lookup Service) panel and search for the corresponding annotation you want to provide. In the case of the more extensive searches you need to click on the “other” options on the bottom of the drop-down menu. For instance, if you have samples coming from e.g. the fish Grayling (Thymallus thymallus) this species name is not available from the drop-down list menu. You have to click on _Other species_ and search for 'Thymallus thymallus' in the OLS panel.


![OLS Client](../markdown/pridesubmissiontool/files/ols-client.png)

## Last steps

### Providing contact details for the Lab Head
As shown in the image below provide your lab head name, email and the affiliation which includes department, institute and country

![Add Lab Head](../markdown/pridesubmissiontool/files/la-head.png)
 
### Optional metadata annotation

In this panel, it is recommended to provide additional metadata in the following four cases:

-	Your dataset is part of a bigger 'umbrella' project/effort (for instance the Human Proteome Project or the EU project ‘PRIME-XS’). It is a way to tag your dataset to enable grouping of datasets this way.
-	There is already a PubMed ID associated with it (the data has been already published).
-	Your dataset represents a re-analysis which reuses an earlier publicly available ProteomeXchangeX dataset.
-	There are other “omics” datasets (for instance transcriptomics, metabolomics data, among others) present in other repositories that can be associated with the proteomics dataset (for instance, they have been generated in the same study). In this case, please provide the accession number of the dataset in the corresponding repository.

![Additional Information](../markdown/pridesubmissiontool/files/additionals.png)
 
### Check before submission

This is the last step before the file upload process actually starts. You should double-check that all the necessary files are included in the submission summary before continuing to the upload step. See below an example of an mzIdentML based ‘Complete’ submission.

![Check Before Submission](../markdown/pridesubmissiontool/files/check-final.png)

## File Upload

This is the actual step when all your files are uploaded to PRIDE (as part of ProteomeXchange). Once the upload is finished, an e-mail will be sent to you to confirm that all your files have been uploaded successfully and that they are waiting to be validated. If for any reason the tool crashes at this point, the Submission Tool can be restarted and the file upload will attempt to restart in the same point before it did.

By default, the submission Tool (since version 2.1) is using the faster Aspera upload transfer protocol with which terabytes can be potentially transferred within a day. Aspera functionality usually provides much faster file transfer speeds than FTP (typically up to 50 times). Should there be any issues with the Aspera upload (probably due to the Internet/ data transfer local settings in your Institute/University), the tool will automatically try to perform the file upload using FTP or manually change to FTP when upload fails with Aspera by clicking back button and click FTP.

![Change Upload Method](../markdown/pridesubmissiontool/files/change-aspera-ftp.png)

You will be also issued with a temporary submission reference to help us to quickly identify and track your submission should you have any questions. **This is not the final PXD dataset identifier**.
