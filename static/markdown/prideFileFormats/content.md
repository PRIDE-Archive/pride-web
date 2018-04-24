<h2> File formats in PRIDE Archive</h2>

Each file included in dataset submission to PRIDE Archive is associated with a category depending of the extension of the file and the content. These categories are used in PRIDE Archive purpose; for example; every submission in PRIDE MUST contains the RAW files from the instruments. At the moment, PRIDE Archive classified the provided files in four different categories:

 - "RAW" (**Mandatory**): Original proprietary files provided by the instruments used in the study (e.g. Thermo RAW).
 - "SEARCH" (**Mandatory**): Files from the software analysis tool (e.g. .dat from Mascot).
 - "PEAK" (**Optional**): The peak list files contains the set of MS/MS peaks used for peptide/protein identification (e.g. .mgf Mascot generic file)
 - "RESULT" (**Optional**): Standard file formats from HUPO-PSI to report peptide/protein identification and quantification results (e.g. mzIdentML)
 - "FASTA" (**Optional**): The protein database used to perform the analysis (e.g. Uniprot Human FASTA file)
 - "SPECTRUM_LIBRARY" (**Optional**): Spectrum libraries used to perform spectrum search.
 - "GEL" (**Optional**): Image files with the gels of the experiment.
 - "OTHER" (**Optional**): Additional files that has been used to perform the experiment.
 - "PARAMETERS_FILE" (**Optional**): The parameters file contains information about the parameters that where used to perform the experiment (e.g. MaxQuant param file)

 The following sections explain each Category and the file formats that classified into each category. Please if you have suggestions you can contact pride-support@ebi.ac.uk

<h2 id="one"> RAW File Formats </h2>

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

<h2 id="two"> SEARCH Files </h2>

| Software Provider | Extension	| File type                   |
|---------------------|-----------|-----------------------------|
| Peptide and Protein Phrophet, X!Tandem, PRIDE Converter	            |.xml*         |	peptide/protein identification in XML   |
| Peptide and Protein Phrophet	            |.pepxml, .protxml	      | Peptide and Protein identification Files      |
| Mascot Output	    |.dat       | Mascot Output File            |
| OMSSA	            |.omx	      | OMSSA Search engine results   |
| SpectraST         |.xls*	    | QSTAR and QTRAP file format |
| ProteomeDiscover  |.msf	      | ProteomeDiscover Result files |
| CRUX              |.txt*      | CRUX Search engines results  |
| Protein Pilot     |.group     | Protein Pilot results        |

> By default *.txt and *.xls would be recognized in the submission tool as Result files. The user should be careful in cases where those files correspond to other categories of files like "OTHER" or "PEAK"

<h2 id="three"> PEAK Files </h2>

Peak files correspond to MS/MS files that can be use to verified the corresponding Peptide Identification. Here the list of PEAK List file formats supported by all PRIDE tools:

<h2 id="two"> PEAK Files </h2>

|  Extension	| File type                   | Documentation URL |
|-------------|-----------------------------|-------------------|
|  .mgf       | Mascot generic format       | http://www.matrixscience.com/help/data_file_help.html |
|  .mzML      | PSI mass spectra file format| http://www.psidev.info/index.php?q=node/257 |
|  .mzXML     | Mass spectra file format from System Biology Institute | http://tools.proteomecenter.org/wiki/index.php?title=Formats:mzXML|
|  .ms2       | Sequest MS/MS peak list     | https://onlinelibrary.wiley.com/doi/pdf/10.1002/rcm.1603 |
|  .pkl       | Micromass peak list        | http://www.matrixscience.com/help/data_file_help.html#QTOF |
|  .mzData    | HUPO PSI predecessor of mzML | http://www.psidev.info/mzdata |
|  .dta       | Sequest MS/MS peak list     | |

> PEAK files are used internally by PRIDE Archive to confirm the Peptide/Protein identifications of RESULT files.

<h2 id="four"> RESULT files </h2>

Result files re standard file formats developed by HUPO-PSI Consortium

