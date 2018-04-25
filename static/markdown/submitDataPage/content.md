
<h2>How to submit data to PRIDE as a ProteomeXchange Submission</h2>

PRIDE welcomes direct user submissions of protein and peptide identification/quantification data with the accompanying mass spectra evidence to be published in peer-reviewed publications. The main focus of PRIDE is to support the deposition of shotgun MS/MS proteomics datasets.

The current way of submitting data to PRIDE is using the PX Submission tool [check the full documentation](/static/markdown/submitDataPage/files/Submission_Tutorial.pdf). This page contains summarized introduction of the document explaining the steps about How to Submit data to PRIDE database following the ProteomeXchange guidelines. Alternatively please contact pride-support@ebi.ac.uk for assistance or advice.

<h2 id="one">Register into PRIDE</h2>

Before submitting to PRIDE database the user need to be sure that it has an account with PRIDE resource. This can be checked by [login into PRIDE database](https://www.ebi.ac.uk/pride/archive/login). If you don't have already a PRIDE account, create one [here](https://www.ebi.ac.uk/pride/archive/register). Currently we don't send out automatic emails upon successful registration. Please contact pride-support@ebi.ac.uk if your login information is not valid after 24 hours following registration.

<h2 id="two">Prepare submission</h2>

The first step to prepare your submission for PRIDE Archive is to know which files are **Mandatory**, which are **Optionals**; and the benefit of providing each file type. Each submitted dataset to PRIDE Archive **MUST** contain the following information (following ProteomeXchange guidelines):

- Mass spectrometer output files (called ‘RAW’): The RAW files are the native machine data files - Thermo .RAW, ABSCIEX .wiff, .scan, Agilent .d, Waters .raw, Bruker .yep, Bruker .baf - [check the full list here](/pridefileformats?step=two)


- Peptide/protein identification files (called ‘SEARCH’): These are the files provided by the software used to perform the data analysis - Mascot .dat, ProteomeDiscover .msf - [check the full list here](/pridefileformats?step=three)

- mzTab or mzIdentML result files (called 'RESULT') (**Recommended**): The mzTab and mzIdentML are standard file formats provided by most of the analysis software tools [check the full list here](/pridefileformats?step=four)

- PEAK List files (called 'PEAK') (**Recommended**): If the mzTab or mzIdentML is provided the corresponding peak list files should be provided in order to ba able to check the MS/MS evidences that support the peptide/protein identifications.

> The submissions that provides the 'RESULT' and corresponding 'PEAK' files are classify in PRIDE Archive as **Complete Submissions** following the ProteomeXchange guidelines. Those submimssions are

Optionally other files can be included in your submission to facilitate the reproduce of the original results and better understanding of the dataset:

- Images of gels generated in the experiment (‘GEL’), sequence database files (FASTA), spectral libraries
(SPECTRUM_LIBRARY) and any other, relevant file types (‘OTHER’).

<h2 id="three">Submit dataset</h2>

When have check that you can provide all the files in previous section, the next step is to Download the [Submission Tool](/submissionTool). The Submission Tool guide the users throught the submission process generating the [submission.px file] (/static/markdown/submitData/PAge/files/Submission_Summary_File.pdf). The submission.px file contains 2 types crucial information:

**Metadata**: experimental metadata like experiment description, sample taxonomy information, instruments and modifications used.
**Mapping between the uploaded files**: for instance between the raw files and the corresponding result or search engine output files.

>If you are using the PX submission tool, the file will be created automatically for you. If you are using the Aspera command line submission mode, you will need to create one. You can do it using with the PX submission tool (without actually uploading the data and saving the submission.px independently) or with scripting.

Finally the user can submit the dataset using the Aspera or FTP protocols.


<h2 id="four">Accessing private data</h2>
<h2 id="five">Post-submission</h2>


