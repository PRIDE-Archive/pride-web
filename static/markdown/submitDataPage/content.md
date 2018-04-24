
<h2>How to submit data to PRIDE as a ProteomeXchange Submission</h2>

PRIDE welcomes direct user submissions of protein and peptide identification/quantification data with the accompanying mass spectra evidence to be published in peer-reviewed publications. The main focus of PRIDE is to support the deposition of shotgun MS/MS proteomics datasets.

The current way of submitting data to PRIDE is using the PX Submission tool [check the full documentation](/static/markdown/submitDataPage/files/Submission_Tutorial.pdf). This page contains summarized introduction of the document explaining the steps about How to Submit data to PRIDE database following the ProteomeXchange guidelines. Alternatively please contact pride-support@ebi.ac.uk for assistance or advice.

<h2 id="one">Register into PRIDE</h2>

Before submitting to PRIDE database the user need to be sure that it has an account with PRIDE resource. This can be checked by [login into PRIDE database](https://www.ebi.ac.uk/pride/archive/login). If you don't have already a PRIDE account, create one [here](https://www.ebi.ac.uk/pride/archive/register). Currently we don't send out automatic emails upon successful registration. Please contact pride-support@ebi.ac.uk if your login information is not valid after 24 hours following registration.

<h2 id="two">Prepare submission</h2>

Each submitted dataset to PRIDE Archive **MUST** contain the following information:

- Mass spectrometer output files (called ‘RAW’): The RAW files are the native machine raw files. The following specified some of the recognized RAW files in PRIDE Archive:

<div class="content">


| Instrument Provider | Extension	| File type                   |
|---------------------|-----------|-----------------------------|
| Agilent	            |.D         |	instrument data format      |
| Bruker	            |.BAF	      | instrument data format      |
| Bruker	            |.FID	      | instrument data format      |
| Bruker	            |.YEP	      | instrument data format      |
| ABI/Sciex	          |.WIFF	    | QSTAR and QTRAP file format |
| ABI/Sciex	          |.t2d	      | 4700 and 4800 file format   |
| Thermo Xcalibur, Micromass (Waters), PerkinElmer, Waters     | .RAW       | Thermo Xcalibur, Micromass (Waters) MassLynx, PerkinElmer TurboMass |
| Shimadzu	          | .QGD	    | GCMSSolution format         |
| Chromtech, Finnigan, VG	| .DAT	| Finnigan ITDS file format, MassLab data format |
| Finnigan (Thermo)	  | .MS	      | ITS40 instrument data format |
| Shimadzu	          | .qgd	    | instrument data format       |
| Shimadzu	          | .spc	    | library data format          |
| Bruker/Varian       |	.SMS	    | instrument data format       |
| Bruker/Varian	      | .XMS	    | instrument data format       |
| ION-TOF	            | .itm	    | raw measurement data         |
| ION-TOF	            | .ita	    | analysis data                |
| Physical Electronics/ULVAC-PHI |	.raw |	raw measurement data |
| Physical Electronics/ULVAC-PHI |	.tdc | 	spectrum data        |


</div>

- Peptide/protein identification files (called ‘RESULT’): These are the Result files from the

• Optionally other files can be included like peak list files (called ‘PEAK’,
mandatory for ‘Complete’ submissions including mzIdentML files, see
below), search engine output files (called ‘SEARCH’, mandatory for
“Partial submissions”, see below), quantification results (‘QUANT’), gel
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


