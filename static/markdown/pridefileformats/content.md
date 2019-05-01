## File formats in PRIDE Archive

Each file included in dataset submission to PRIDE Archive is associated with a category depending of the extension of the file and the content. These categories are used in PRIDE Archive purpose; for example; every submission in PRIDE MUST contains the RAW files from the instruments. At the moment, PRIDE Archive classifies the provided files in different categories:

 - "RAW" (**Mandatory**): Original proprietary files provided by the instruments used in the study (e.g. Thermo RAW).
 - "SEARCH" (**Mandatory for Partial Submissions, Optional for Complete Submissions**): Files from the software analysis tool (e.g. .dat from Mascot).
 - "RESULT" (**Mandatory for Complete Submissions**): Standard file formats from HUPO-PSI to report peptide/protein identification and quantification results: mzIdentML and mzTab.
 - "PEAK" (**Mandatory for Complete Submissions, Recommended for Partial Submissions**): The peak list files contains the set of MS/MS peaks used for peptide/protein identification (e.g. mgf Mascot generic files).
 - "FASTA" (**Optional**): The search protein database used to perform the analysis (e.g. Uniprot Reference Proteome FASTA file)
 - "SPECTRUM_LIBRARY" (**Optional**): Spectrum libraries used to perform spectrum search.
 - "GEL" (**Optional**): Image files with the gels of the experiment.
 - "PARAMETERS_FILE" (**Optional**): The parameters file contains information about the parameters that where used to perform the experiment (e.g. MaxQuant param file).
 - "OTHER" (**Optional**): Additional files that have been used to perform the experiment.

 The following sections explain each category and the file formats that can be included into each category. Please if you have questions and/or suggestions you can contact pride-support@ebi.ac.uk.

## RAW File Formats

The following table specified some of the recognised RAW files in PRIDE Archive per Instrument Provider:

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

## SEARCH Files

| Software Provider | Extension	| File type                   |
|---------------------|-----------|-----------------------------|
| Peptide and Protein Prophet, X!Tandem, PRIDE Converter	            |.xml*         |	peptide/protein identification in XML   |
| Peptide and Protein Prophet	            |.pepxml, .protxml	      | Peptide and Protein identification Files      |
| Mascot Output	    |.dat       | Mascot Output File            |
| OMSSA	            |.omx	      | OMSSA Search engine results   |
| SpectraST         |.xls*	    | QSTAR and QTRAP file format |
| ProteomeDiscoverer  |.msf	      | ProteomeDiscover Result files |
| CRUX              |.txt*      | CRUX Search engines results  |
| Protein Pilot     |.group     | Protein Pilot results        |


## PEAK Files

Peak files correspond to MS/MS files that can be used to verify the corresponding peptide identifications. The list of PEAK file formats supported by all PRIDE tools is:

|  Extension	| File type                   | Documentation URL |
|-------------|-----------------------------|-------------------|
|  .mgf       | Mascot generic format       | http://www.matrixscience.com/help/data_file_help.html |
|  .mzML      | PSI mass spectra file format| http://www.psidev.info/index.php?q=node/257 |
|  .mzXML     | Mass spectra file format from the Institute for Systems Biology | http://tools.proteomecenter.org/wiki/index.php?title=Formats:mzXML|
|  .ms2       | Sequest MS/MS peak list     | https://onlinelibrary.wiley.com/doi/pdf/10.1002/rcm.1603 |
|  .pkl       | Micromass peak list        | http://www.matrixscience.com/help/data_file_help.html#QTOF |
|  .mzData    | HUPO PSI predecessor of mzML | http://www.psidev.info/mzdata |
|  .dta       | Sequest MS/MS peak list     | |

## RESULT files

Result files are standard open file formats developed by HUPO-PSI to exchange proteomics results. Following the ProteomeXchange guidelines the submissions that provide these files are called **COMPLETE** submissions. These files are the only result files that the PRIDE ecosystem (resources, tools) is able to read, write and transform. For example, these submissions are the only ones that are searchable by protein identifiers and peptide sequences in PRIDE Archive [read more here about searching](../static/documentation/searchinginpridearchive).

There are two relevant PSI file formats:

- mzIdentML (version 1.1 and 1.2 http://www.psidev.info/mzidentml):  mzIdentML is a data standard developed by the Proteomics Informatics working group of the PSI. The extension of the file .mzid is used by the submission tool to recognize the file format automatically. The mzIdentML only contains the peptide/protein identification information of a proteomics experiment, not the quantitation related information.

- mzTab (version 1.0 http://www.psidev.info/mztab): mzTab is is a data standard also developed by members of the Proteomics Informatics working group of the PSI to represent both identification and quantification data. For PRIDE Archive the mzTab file MUST contain the Protein and PSM tables and the Peptide section is optional. **We recommended this file format to report quantification results**

| Software | Standard File format supported|
|----------|-------------------------------|
| Mascot   | mzTab v1.0, mzIdentML v1.1 v1.2 |
| MaxQuant   | mzTab v1.0 |
| OpenMS   | mzTab v1.0, mzIdentML v1.1 v1.2 |
| PEAKS    | mzIdentML v1.1                    |
| MSGF+    | mzIdentML v1.1                   |
| Byonic (Protein Metrics Inc.)	| mzIdentML v1.1        |
| Crux	   | mzIdentML v1.1                   |
| IDPicker | mzIdentML v1.1                   |
| IP2	     | mzIdentML v1.1                   |
| Iquant	 | mzIdentML v1.1	                  |
| MyriMatch| mzIdentML v1.1	                  |
| PeptideShaker | mzIdentML v1.1 v1.2         |
| PGA	     | mzIdentML v1.1                   |
| PIA	     | mzIdentML v1.1.	                |
| ProteinLynx   | mzIdentML v1.1  |
| Progenesis QI | mzIdentML v1.1  |
| ProteinPilot	| mzIdentML  v1.1 |
| ProteinScape  | mzIdentML v1.1 |
| ProteoWizard	| mzIdentML v1.1 |
| Scaffold	 | mzIdentML v1.1 |
| PatternLab | mzIdentML v1.1 |
| DTASelect2MzId	| mzIdentML v1.1 |

It is important to highlight that mzIdentML/mzTab files do not contain the mass spectra, which must be provided in external corresponding files referenced from the mzIdentML or mzTab (like mzML, mgf, dta, ms2, apl or pkl). **mzIdentML and mzTab files that reference mass spectra in the RAW files are not currently allowed for PRIDE Complete Submissions. They have to reference Peak List files**.

## FASTA and SPECTRUM_LIBRARY

Peptide and protein identification analysis is mainly performed using protein sequence databases or spectral library searches using spectral libraries. The following files are **Recommended**:

- 'FASTA' files are automatically recognised if they are in the following formats: .fasta and .faa. The PSI PEFF format can also be provided as searched sequence database, but at present these files need to be tagged as 'FASTA' as well.

- 'SPECTRUM_LIBRARY' is automatically recognised if files have the extension: .msp

## PARAMETER FILES

PARAMETER files are the configuration files used during the data analysis process. These files are **Optional** files. Some of the files that are automatically recognised by PRIDE are:

|  Extension	| File type                        |
|-------------|----------------------------------|
|  .json      | PeptideShaker Configuration file |
|  .txt       | MaxQuant param file              |

## 'GEL' and 'OTHER' files

Additional files that can be added as 'GEL' or 'OTHER' files. The Submission Tool recognizes every image extension provided during the submission as a 'GEL' image.

Other file types such as .doc, .pdf, .xls can be added as 'OTHER' files and will be provided.
