
## How to submit data to PRIDE as a ProteomeXchange Submission

PRIDE welcomes direct user submissions of protein and peptide identification/quantification data with the accompanying mass spectra evidence to be published in peer-reviewed publications. The main focus of PRIDE is to support the deposition of shotgun MS/MS proteomics datasets.

The current way of submitting data to PRIDE is using the PX Submission tool [check the full documentation](../../static/markdown/submitDataPage/files/Submission_Tutorial.pdf). This page contains summarized introduction of the document explaining the steps about How to Submit data to PRIDE database following the ProteomeXchange guidelines. Alternatively please contact pride-support@ebi.ac.uk for assistance or advice.

## Register into PRIDE

Before submitting to PRIDE database the user need to be sure that it has an account with PRIDE resource. This can be checked by [login into PRIDE database](https://www.ebi.ac.uk/pride/archive/login). If you don't have already a PRIDE account, create one [here](https://www.ebi.ac.uk/pride/archive/register). Currently we don't send out automatic emails upon successful registration. Please contact pride-support@ebi.ac.uk if your login information is not valid after 24 hours following registration.

## Prepare submission

The first step to prepare your submission for PRIDE Archive is to know which files are **Mandatory**, which are **Recommended**; and the benefit of providing each file type. Each submitted dataset to PRIDE Archive **MUST** contain the following information (following ProteomeXchange guidelines):

- Mass spectrometer output files (called ‘RAW’) (**Mandatory**): The RAW files are the native machine data files - Thermo .RAW, ABSCIEX .wiff, .scan, Agilent .d, Waters .raw, Bruker .yep, Bruker .baf - [check the full list here](./pridefileformats#search_files). Each RAW file needs to be realted with at least one SEARCH file.


- Peptide/protein identification files (called ‘SEARCH’) (**Mandatory**): These are the files provided by the software used to perform the data analysis - Mascot .dat, ProteomeDiscover .msf - [check the full list here](/markdownpage/pridefileformats#search_files). Each SEARCH file needs to be related with at least one RAW file.

- mzTab or mzIdentML result files (called 'RESULT') (**Recommended**): The mzTab and mzIdentML are standard file formats provided by most of the analysis software tools [check the full list here](/markdownpage/pridefileformats#result_files). The mzIdentML contains only identification information, were the mzTab can contains Quantitation/Idnetification results. These files needs to be related with at least one PEAK file.

- PEAK List files (called 'PEAK') (**Recommended**): If the mzTab or mzIdentML is provided the corresponding peak list files should be provided in order to be able to check the MS/MS spectrum evidences that support the peptide/protein identifications ([check the full list here](./pridefileformats#peak_files)).

> The submissions that provides the 'RESULT' and corresponding 'PEAK' files are classify in PRIDE Archive as **Complete Submissions** following the ProteomeXchange guidelines. Please, read here the [benefits of Complete Submissions](/markdownpage/whycompletesubmissions#whycompletesubmissions).

Optionally other files can be included in your submission to facilitate the review process or reproduce of the original results and better understanding of the dataset:

- Images of gels generated in the experiment (‘GEL’), sequence database files (FASTA), spectral libraries (SPECTRUM_LIBRARY) and any other, relevant file types (‘OTHER’).

## Submit dataset

If you have check that you can provide all the files in previous section, the next step is to Download the [Submission Tool](/submissiontool). The Submission Tool guide the users throught the submission process generating the [submission.px file](../../static/markdown/submitdatapage/files/Submission_Summary_File.pdf). The submission.px file contains 2 types crucial information:

**Metadata**: Minimum experimental metadata like experiment description, sample taxonomy information, instruments and modifications used.
**Mapping between the uploaded files**: for instance between the raw files and the corresponding result or search engine output files.

>If you are using the PX submission tool, the file will be created automatically for you.

Finally the user can submit the dataset using the Aspera or FTP protocols.


## Accessing private data

Submitted datasets are 'private' by default, which means you need to be [logged-in](https://www.ebi.ac.uk/pride/archive/login) to view your data. During the submission process we create a PX reviewer account for your submission which you can include in your letter to the editor or manuscript to be used during the review process. The PX reviewer account will give you access to all of the files belonging to your submission. You can access the private dataset files in two ways:

#### PRIDE Archive web page

PRIDE Archive web site is available at http://www.ebi.ac.uk/pride/archive. Registered submitters can use their personal accounts or the reviewer accounts to access and download the individual PX datasets. For every submission there is a separate reviewer account generated. Once logged in with your registered User (the e-mail account you used to register in PRIDE) or an issued Reviewer Account you are going to see the private dataset/s listed.

</br>

![Private Submission List](../../static/markdown/submitDataPage/files/private-submission.png)


#### PRIDE Inspector

[PRIDE Inspector](/prideinspector) is a Java Standalone Desktop tool that can be used in to query and retrieve the information from PRIDE Archive data:

The following applies for both Complete and Partial Submissions:

Open PRIDE Inspector by clicking on the pride-inspector-<version-number>.jar file in the tool's working directory -> Private Download -> ProteomeXchange -> PX reviewer account details. You can open the PRIDE XML and mzIdentML result files with PRIDE Inspector or just download all the files that you wish to investigate.

![Private access in PRIDE inspector](../../static/markdown/submitDataPage/files/pride-inspector.png)

In case of Complete Submissions you can alternatively launch PRIDE Inspector with a WebStart URL provided in the automatic "Submission Complete" e-mail. This option is for downloading the PRIDE XML and mzIdentML files only into a target folder. In order to use the PRIDE Inspector Java Web Start option to display your data there is a waiting period of up to one day upon getting the automatic "Submission Complete" e-mail.


## Post-submission


The particular post-submission steps include the following:

- Modifying the original dataset: In case you need to add to a small number of additional "other files" (like csv, plain text files, spreadhseets, scripts) we can provide you with FTP details to upload and can add these to the original dataset without you resubmitting the whole dataset. In case you have used the PX Submission Tool and you need to add additional raw files and accompanying result or search files, you need to resubmit the whole dataset again. Please follow the procedure here. In case of an Aspera bulk submission you have to upload the modified and missing files into a new subdirectory within your target directory and regenerate the submission summary file including all the old and modified and new files again.

- Referencing the dataset in the [paper](/citation):

- Releasing the dataset: By default, your data will be made publicly available after your manuscript has been accepted, or when we have your instructions to do so. While we may also receive acceptance notifications from some journals, we would like to ask all submitters to kindly notify us separately. Otherwise, it can happen that we don’t now that your manuscript is already published. You can notify us two ways:

- Via the PRIDE  Archive web site (http://www.ebi.ac.uk/pride/archive). Once you have logged in with your user account at http://www.ebi.ac.uk/pride/archive/login you can click the green “Publish” buttons located next to your unpublished datasets. Here you can provide details for your dataset and submit a web form.


### Public Release

-  Contacting pride-support@ebi.ac.uk.

Upon making the project public, a project page will be released over at ProteomeCentral (http://proteomecentral.proteomexchange.org) and from a particular dataset page an FTP location will be available.


