
## How to submit data to PRIDE and what happens after a dataset has been submitted

PRIDE welcomes direct user submissions of protein and peptide identification/quantification data with the accompanying mass spectra evidence and any other related data types, usually to be published in peer-reviewed publications. The  focus of PRIDE is to support the deposition of proteomics datasets from any experimental approach.

The current way of submitting data to PRIDE is using the PX Submission tool [check the full documentation](../static/markdown/submitdatapage/files/Submission_Tutorial.pdf). This page contains a summarized introduction of the document explaining the steps about How to Submit datasets to PRIDE database following the ProteomeXchange guidelines. Alternatively please contact pride-support@ebi.ac.uk for assistance or advice.

The following [open access publication](https://onlinelibrary.wiley.com/doi/full/10.1002/pmic.201400120) also exemplifies the main steps of a submission to PRIDE, although some of less-important details might have changed.

## Register as a user in PRIDE

Before submitting to PRIDE database the user need to be sure that it has an account with PRIDE resource. If you don't have already a PRIDE account, please create one [here](https://www.ebi.ac.uk/pride/archive/register). Currently we don't send out automatic emails upon successful registration. Please contact pride-support@ebi.ac.uk if your login information is not valid after 24 hours following registration.

## What constitutes a PRIDE dataset?
The general rule is that a dataset should correspond to the data described in a single manuscript, if all data in the manuscript comes from the same data workflow (e.g. Data Dependent Acquisition, DDA). If a manuscript contains data coming from different proteomics workflows (DDA and Selected Reaction Monitoring, SRM), it is recommended to split the data in different datasets so this is easier to interpret for third parties. However, it should be highlighted that it is the submitter’s decision how to organise their submitted datasets, which could depend on a number of factors (e.g. future publications).


## Complete and Partial submissions

There are two types of submitted datasets to PRIDE (or to any other ProteomeXchange resource):

- **Complete Submissions.** A complete submission ensures that the processed results (at least the identification data) and the corresponding mass spectra can be parsed, integrated and visualised by PRIDE, connecting the identification data to the corresponding mass spectra. To achieve that, processed identification results need to be provided in a PSI open standard format (either mzIdentML or mzTab).

Examples include bottom-up DDA datasets where identification results were generated from any tool that can export the data standard mzIdentML (and the corresponding peak list files, see below).


- **Partial Submissions.** In this case processed identification results are provided in other data formats than the ones indicated above for complete submissions. For PRIDE, it is then not possible to parse, integrate and visualise the identification and/or connect the processed results to the corresponding mass spectra. However, all the submitted files are made available to download. This mechanism allows data generated from any software that cannot export yet to the supported formats, or from less-mature/novel proteomics experimental approaches to be deposited in PRIDE.

Examples include bottom-up DDA datasets where identification results were generated from any tool that cannot export the PSI data standards mzIdentML or mzTab, or other datasets coming from approaches where no open standard for the results currently has been implemented (e.g. top-down proteomics).

## Prepare submission

The first step to prepare your submission for PRIDE is to know which files are **Mandatory**, which are **Recommended** and which are **Optional**, and the benefits of providing each file type. Each submitted dataset to PRIDE **MUST** contain the following information (following ProteomeXchange guidelines):

- Mass spectrometer output files (called ‘RAW’) (**Mandatory**): The RAW files are the native machine data files - Thermo .RAW, ABSCIEX .wiff, .scan, Agilent .d, Waters .raw, Bruker .yep, Bruker .baf - [check the full list here](./pridefileformats#search_files). Each RAW file needs to be related with at least one SEARCH file.

- mzTab or mzIdentML result files (called 'RESULT') (**Mandatory for Complete Submissions**): The mzTab and mzIdentML are standard file formats provided by most of the analysis software tools [check the full list here](./pridefileformats#result_files). The mzIdentML files contains only identification information, whereas the mzTab files can contains both Identification and Quantification results. These files needs to be related with at least one 'PEAK' (peak list) file.

- Peptide/protein identification files (called ‘SEARCH’) (**Mandatory for Partial Submissions, Optional for Complete Submissions**): These are the files output by the software used to perform the data analysis - Mascot .dat, ProteomeDiscover .msf - [check the full list here](./pridefileformats#search_files). Each SEARCH file needs to be related with at least one RAW file.

- PEAK List files (called 'PEAK') (**Mandatory for Complete Submissions, Recommended for Complete submissions**): If mzTab or mzIdentML are provided the corresponding peak list files must also be provided in order to be able to check the MS/MS evidences that support the peptide/protein identifications ([check the full list here](./pridefileformats#peak_files)).


Optionally other files can be included in any dataset submission to facilitate the review process or to help reproduce the original results or to provide a better understanding of the dataset:

- There are specific files tags for: Images of gels generated in the experiment (‘GEL’), search sequence database files (FASTA), spectral libraries ('SPECTRUM_LIBRARY') and any other, relevant file types (‘OTHER’).

## Submit your dataset

If you have all the files ready, the next step is to Download the [PX Submission Tool](./pridesubmissiontool). The PX Submission Tool guides the users through the submission process generating at the end the [submission.px file](../static/markdown/submitdatapage/files/Submission_Summary_File.pdf). The submission.px file contains 2 types of crucial information:

**Metadata**: Required experimental metadata like experiment description, sample taxonomy information, instruments and protein modifications used.
**Mappings between the uploaded files**: for instance between the RAW files and the corresponding 'RESULT' or search engine output ('SEARCH') files.

Finally users can submit the dataset using the Aspera (by default) or FTP file transfer protocols provided by the PX Submission Tool.


## Accessing private data

Submitted datasets are 'private' by default, which means you need to be [logged-in](https://www.ebi.ac.uk/pride/archive/login) to view your data. During the submission process we create a reviewer account for your dataset which you can include in your letter to the editor or in the actual manuscript, so that it can be used during the review process. The reviewer account will give access to all of the files included in a dataset. You can access the private dataset files in two ways:

#### PRIDE Archive web page

PRIDE Archive web site is available at http://www.ebi.ac.uk/pride/archive. Registered submitters can use their personal accounts or the reviewer accounts to access and download the individual datasets. For every submitted dataset there is a separate reviewer account generated. Once logged in with your registered User (the e-mail account you used to register in PRIDE) or an issued Reviewer Account you will get access to the private dataset/s listed under that account.

</br>

![Private Submission List](../static/markdown/submitdatapage/files/private-submission.png)


#### PRIDE Inspector

[PRIDE Inspector](./prideinspector) is a Standalone Desktop tool that can be used in to query and retrieve the information from PRIDE Archive data:

The following applies for both Complete and Partial Submissions:

Open PRIDE Inspector by clicking on the pride-inspector-<version-number>.jar file in the tool's working directory -> Private Download -> ProteomeXchange -> reviewer account details. You can open the PRIDE XML, mzIdentML or mzTab RESULT files using PRIDE Inspector or just download all the files that you wish to investigate.

IMPORTANT: Aspera-based faster download for 'private' datasets is enabled in PRIDE Inspector, not in the PRIDE web at present.

![Private access in PRIDE inspector](../static/markdown/submitdatapage/files/pride-inspector.png)

In case of Complete Submissions you can alternatively use PRIDE Inspector. This option is for downloading the PRIDE XML and mzIdentML files only into a target folder. In order to use the PRIDE Inspector Java Web Start option to display your data there is a waiting period of up to one day upon getting the automatic "Submission Complete" e-mail.


## Post-submission steps

The main post-submission steps include the following ones:

- 1) Modifying the original dataset: In case you need to add to a small number of additional "other files" (like csv, plain text files, spread sheets, scripts, etc) we can provide you with FTP details to upload and can add these to the original dataset without you resubmitting the whole dataset. In case you have used the PX Submission Tool and you need to add additional RAW files and accompanying RESULT or SEARCH files, you need to resubmit the whole dataset again. Please follow the procedure here.

- 2) Referencing the dataset in the [paper](./citationpage).

- 3) **Public release of datasets**

By default, your dataset will be made publicly available after your manuscript has been accepted, or when we have your instructions to do so. While we may also receive acceptance notifications from some journals, we would like to ask all submitters to kindly notify us separately. Otherwise, it can happen that we don’t now that your manuscript is already published. It is important for authors to take into account that some journals may also have this public release policy in parallel as well, and it may be possible that the manuscript is not accepted until the dataset in made public to the community.

You can notify us in three different ways:

- Via the PRIDE Archive web site (http://www.ebi.ac.uk/pride/archive). Once you have logged in with your user account at http://www.ebi.ac.uk/pride/archive/login you can click the green “Publish” buttons located next to your unpublished datasets. Here you can provide details for your dataset and submit a web form.

-  If you are not the original submitter, but have found that the dataset has been included in a publication, you can go directly to https://www.ebi.ac.uk/pride/archive/projects/PXDxxxxxx/publish, where 'xxxxxx' is the integer including the PXD dataset identifier.

-  Contacting pride-support@ebi.ac.uk.

Upon making the project public, a project page will be released in PRIDE and available also at ProteomeCentral (http://proteomecentral.proteomexchange.org).

**Exceptions to the public release policy of the datasets**
Exceptions to this policy may be only be granted in documented special cases, which will be considered in an individual case-by-case basis. If the original submitters have used or are planning to use the same dataset (that should be released) in other ongoing studies, they can request once an extension of the non-released status. This extension will be of a maximum of 6-months. An official request must be done by the data owner to PRIDE, justifying this request appropriately. It should be noted that this 6-month extension does not consider the requirements of the scientific journal where the article has been published, which may mandate that the data is released immediately anyway.
