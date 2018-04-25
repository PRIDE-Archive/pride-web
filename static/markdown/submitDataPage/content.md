
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

- PEAK List files (called 'PEAK') (**Recommended**): If the mzTab or mzIdentML is provided the corresponding peak list files should be provided in order to ba able to check the MS/MS evidences that support the peptide/protein idetifications.

Optionally other files can be included like peak list files (called ‘PEAK’,
mandatory for ‘Complete’ submissions including mzIdentML files, see
below), , gel
images (‘GEL’), sequence database files (FASTA), spectral libraries
(SPECTRUM_LIBRARY) and any other, relevant file types (‘OTHER’).
In addition, a more specific procedure is now available for MS imaging
datasets. For instance, some extra requirements are needed and additional
file tags have been created (see Appendix VI for details). The details are also
explained in this open access publication (Roempp et al., Anal Bioanal Chem,
2015) (4), freely accessible here.

<h2 id="three">Submit dataset</h2>

<h2 id="four">Accessing private data</h2>
<h2 id="five">Post-submission</h2>


