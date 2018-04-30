
## Tools one

## Tools two

## Tools three

## Submitting your data to PRIDE:


PRIDE welcomes direct user submissions of protein and peptide identification/quantification data with the accompanying mass spectral evidence to be published in peer-reviewed publications. The main focus of PRIDE is to support the deposition of shotgun MS/MS proteomics datasets.

The current way of submitting data to PRIDE is following the [ProteomeXchange (PX) consortium](http://www.proteomexchange.org/) guidelines. The current page contains summarized introduction to the 2 main PX Submission modes. If you need more information a detailed tutorial is [available](http://www.proteomexchange.org/sites/proteomexchange.org/files/documents/px_submission_tutorial2.pdf) at the ProteomeXchange web site. Alternatively please contact pride-support@ebi.ac.uk for assistance or advice.

The main tool to submit data is the PX Submission Tool than can be downloaded by clicking on the button below.


![Minion](/static/markdown/submitDataPage/image/download.png)


The PX/ PRIDE submission process involves the following elements seen on the figure below.

![Minion](/static/markdown/submitDataPage/image/Slide1.jpg)

Follow these steps to submit your data:

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. Register
If you do not already have a PRIDE account, create one here. Currently we don't send out automatic emails upon succesful registration. Please contact pride-support@ebi.ac.uk if your login information is not valid after 24 hours following registration.

2. Choose submission type
You can choose between 2 main submission types depending on the availability of mzIdentML or PRIDE XML files as "Result" files for Complete Submissions. The recommended submission subtype is a Complete Submission, but alternatively Partial Submissions are accepted as well.

## 2A. Complete Submission: mzIdentML- or PRIDE XML-based

The 2 subtypes of Complete Submissions are either mzIdentML- or PRIDE XML-based. Complete Submissions mixing the 2 types of ‘RESULT’ files are not allowed.

- Marker character change forces new list start:
- Result files: mzIdentML 1.1 files with identifications provided. In the submission tool they should be tagged as “RESULT”. It is also recommended to check your mzIdentML files before submission using the PRIDE Inspector tool (the mzIdentML supporting version will be out in early January, 2014). mzIdentML version 1.0 files are not supported.
- Peak list files: Since the mzIdentML files themselves do not contain the spectra information it is mandatory to provide the peak list files (eg. mgf files) that were used for the original search and are referenced in the mzIdentML file. These are different from the provided mandatory raw files. In the submission tool they should be tagged as “PEAK” and the submission tool will try to automatically map the peak files to the mzIdentML file where they are listed.
- Raw files: the MS instrument output files, for instance Thermo RAW files. As an alternative, lightly processed  mzML, mzXML, mzData files are acceptable if MS1 level spectra information is available and the different peak processing steps are known. In the submission tool they should be tagged as “RAW”.


