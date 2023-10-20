## How to submit data to PRIDE

PRIDE welcomes direct user submissions of protein and peptide identification/quantification data with the accompanying mass spectra evidence and any other related data types, usually to be published in peer-reviewed publications. The  focus of PRIDE is to support the deposition of proteomics datasets from any experimental approach.

The current way of submitting data to PRIDE is using the PRIDE Submission tool [check the full documentation](../markdown/submitdatapage/files/Submission_Tutorial.pdf). This page contains a summarized introduction of the document explaining the steps about How to Submit datasets to PRIDE database following the ProteomeXchange guidelines. Alternatively please contact pride-support@ebi.ac.uk for assistance or advice.

## What happens to my data after upload
 
 - Your submission reference is 1-XXXXXXXX-X. This number will be included in any e-mail communication with us.
 - Important information: Your submission reference is not the final dataset accession number.
 - Standard procedure once your dataset is uploaded to PRIDE -
 - 1st Step – A curator will perform an initial assessment of the dataset including PRIDE Validation pipeline. Initial checks involve checking the metadata, type of submission
 - 2nd Step – If data validation is successful, the submission is performed. The submitter gets an e-mail including the dataset identifier and reviewer’s credentials
 - Please note, PRIDE receives high numbers of submitted datasets every day, so the processing of your dataset can take up to 5 working days, although it may happen earlier than that.


The following [open access publication](https://onlinelibrary.wiley.com/doi/full/10.1002/pmic.201400120) also exemplifies the main steps of a submission to PRIDE, although some of less-important details might have changed.

## Register as a user in PRIDE

Before submitting to PRIDE database the user need to be sure that it has an account with PRIDE resource. If you don't have already a PRIDE account, please create one [here](https://www.ebi.ac.uk/pride/register). Currently we don't send out automatic emails upon successful registration. Please contact pride-support@ebi.ac.uk if your login information is not valid after 24 hours following registration.

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

If you have all the files ready, the next step is to Download the [PRIDE Submission Tool](./pridesubmissiontool). The PRIDE Submission Tool guides the users through the submission process generating at the end the [submission.px file](../markdown/submitdatapage/files/Submission_Summary_File_Format.pdf). The submission.px file contains 2 types of crucial information:

**Metadata**: Required experimental metadata like experiment description, sample taxonomy information, instruments and protein modifications used.
**Mappings between the uploaded files**: for instance between the RAW files and the corresponding 'RESULT' or search engine output ('SEARCH') files.

Finally users can submit the dataset using the Aspera (by default) or FTP file transfer protocols provided by the PRIDE Submission Tool.

## Accessing private data

Submitted datasets are 'private' by default, which means you need to be [logged-in](https://www.ebi.ac.uk/pride/archive/login) to view your data. During the submission process we create a reviewer account for your dataset which you can include in your letter to the editor or in the actual manuscript, so that it can be used during the review process. The reviewer account will give access to all of the files included in a dataset. You can access the private dataset files in two ways:

## PRIDE Archive web page

PRIDE Archive web site is available at http://www.ebi.ac.uk/pride/archive. Registered submitters can use their personal accounts or the reviewer accounts to access and download the individual datasets. For every submitted dataset there is a separate reviewer account generated. Once logged in with your registered User (the e-mail account you used to register in PRIDE) or an issued Reviewer Account you will get access to the private dataset/s listed under that account.

</br>

![Private Submission List](../markdown/submitdatapage/files/private-submission.png)

## Making the data public

Once your publication is accepted, it is essential for the user to ensure that the associated dataset is made publicly accessible. Failure to do so may result in notifications from journals or fellow researchers requesting the dataset's public availability. Furthermore, if the manuscript is designated as open access, the PRIDE team will automatically identify instances where the corresponding dataset is not public and initiate the necessary publication steps. 

You can make your dataset public in two ways:

- Via the PRIDE Archive web site (http://www.ebi.ac.uk/pride/archive). Once you have logged in with your user account at http://www.ebi.ac.uk/pride/archive/login you can list all your private datasets, after selecting the dataset to be published; the user can click the green “Publish” button to request the publication. Here you can provide details for your dataset and submit a web form.

- If you are not the original submitter, you can contact pride-support@ebi.ac.uk.

Upon making the project public, a project page will be released in PRIDE and available also at ProteomeCentral (http://proteomecentral.proteomexchange.org).

Note: **Exceptions to the public release policy of the datasets**

Exceptions to this policy may be only being granted in documented special cases, which will be considered on an individual case-by-case basis. If the original submitters have used or are planning to use the same dataset (that should be released) in other ongoing studies, they can request once an extension of the non-released status. This extension will be of a maximum of 6-months. An official request must be done by the data owner to PRIDE, justifying this request appropriately. It should be noted that this 6-month extension does not consider the requirements of the scientific journal where the article has been published, which may mandate that the data is released immediately anyway.

## PRIDE Submission Questions and Answers

### Can a publication/project contain multiple datasets?

It is possible to submit multiple datasets for the same project/publication. Some of the reasons to submit multiple datasets for the same study/project/publication: 

- The study contains multiple samples from different organisms, instrument configurations, etc. For example, the study is performed on human samples and other model organisms like mouse. The submitter can do two submissions one for each organism.
- DIA (Data Independent Acquisition) and DDA (Data Dependent Acquisition) datasets. The submitter can do two submissions one for each acquisition method. One of the DDA data used to generate the spectral libraries and another DIA including the libraries generated with the DDA data. 
- The study contains multiple samples from the same organism but different conditions. For example, the study is performed on human samples and the samples are treated with different drugs. The submitter can do two submissions one for each condition with the corresponding SDRFs. 

In the manuscript, the submitters can reference each independent dataset with the corresponding accession number.

### Can I modify my private submission before publication? 

During the review process of the manuscript, the user may want to modify their dataset. The following things can be modified: 

- In the PRIDE user profile, the user can modify the title, description, and other fields from the metadata. 
- Using the PRIDE Submission Tool, the user can perform a resubmission which allows to add, modify or remove files from the private submission. 

### How can I upload a big dataset? 

For big submissions, we suggest generating the submission.px file, which includes the list of files and submission metadata, through the PRIDE Submission Tool. Following this, save the submission.px file to your local computer. Then, we recommend reaching out to the PRIDE support team to obtain an FTP account and dedicated folder for uploading your files, including the submission.px and checksum. Once you've secured access, you can employ your preferred FTP or Aspera client to transfer your data. Once all the data is successfully uploaded, please contact the PRIDE team to initiate the submission process.

**Note**: It is important to note that big submissions these recommendations depend on your internet connection and the size of the dataset. On average, for submissions less than 1 terabyte, we recommend using the PRIDE Submission Tool. For submissions bigger than 1 terabyte, we recommend using the FTP/Aspera client.



