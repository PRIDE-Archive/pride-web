<h2 id="one"> File formats in PRIDE Archive</h2>

Each file included in dataset submission to PRIDE Archive is associated with a category depending of the extension of the file and the content. These categories are used in PRIDE Archive purpose; for example; every submission in PRIDE MUST contains the RAW files from the instruments. At the moment, PRIDE Archive classified the provided files in four different categories:

 - "RAW": Original proprietary files provided by the instruments used in the study (e.g. Thermo RAW).
 - "SEARCH": Files from the software analysis tool (e.g. .dat from Mascot).
 - "PEAK": The peak list files contains the set of MS/MS peaks used for peptide/protein identification (e.g. .mgf Mascot generic file)
 - "RESULT": Standard file formats from HUPO-PSI to report peptide/protein identification and quantification results (e.g. mzIdentML)
 - "FASTA": The protein database used to perform the analysis (e.g. Uniprot Human FASTA file)
 - "SPECTRUM_LIBRARY": Spectrum libraries used to perform spectrum search.
 - "GEL" files: Image files with the gels of the experiment.
 - "OTHER" files: Additional files that has been used to perform the experiment.
 - "PARAMETERS_FILE": The parameters file contains information about the parameters that where used to perform the experiment (e.g. MaxQuant param file)

 The following sections explain each Category and the file formats that classified into each category. Please if you have suggestions you can contact pride-support@ebi.ac.uk

<h2 id="two"> RAW File Formats </h2>

The following table specified some of the recognized RAW files in PRIDE Archive by Instrument Provider:

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

<h2 id="three"
