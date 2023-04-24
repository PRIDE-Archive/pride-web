
## PRIDE Universal Spectrum Identifier (USI) Service 

The [Universal Spectrum Identifier (USI) service](https://www.ebi.ac.uk/pride/archive/usi) is a PRIDE service that enable users and submitters to retrieve a specific spectrum from a given PRIDE dataset/submission. The service enables the following operations: 

- Visualize a spectrum from a given public PRIDE dataset/submission.
- Retrieve the spectrum metadata, including the spectrum properties, dataset information and sample related information (if available).
- Search for other Peptide Spectrum Matches (PSM) in PRIDE Archive for the same spectrum or peptide sequence. 

## What is a USI

A USI is a standard developed by the HUPO Proteomics Standards Initiative (HUPO-PSI) that represents a unique identifier for every specific mass spectrum in a given ProteomeXchange dataset. More generally, the USI is a multi-part key identifier for identifying mass spectra contained in public data repositories, primarily focused on proteomics. 

A USI such as `mzspec:PXD000966:CPTAC_CompRef_00_iTRAQ_05_2Feb12_Cougar_11-10-09.raw:scan:12298:[iTRAQ4plex]-LHFFM[Oxidation]PGFAPLTSR/3` encodes the information for: 

- Dataset: ProteomeXchange (PRIDE) accession number.
- MS Run: The name of the MS Run/RAW file 
- Scan number: The scan number in the spectra file (MS Run).
- Peptidoform and charge of the ions that constitute the  interpretation of the spectrum. This part is optional. 

The full USI technical specification can be found [here](https://psidev.info/sites/default/files/2021-07/USI_FullSpecification_1.0.0_FINAL.pdf). The following figure shows what are the different parts of a USI: 

![USI](https://psidev.info/sites/default/files/inline-images/USI_examples_0.png)

## Peptidoform representation and ProForma notation 

The PRIDE Archive USI service allow users to retrieve a spectra by spectrum part of the usi `mzspec:{PX Accession}:{MS Run}:scan:{Scan Number}` or by the full USI `mzspec:{PX Accession}:{MS Run}:scan:{Scan Number}:{Peptidoform}/{Charge}`.

The peptidoform represents the peptide sequence with protein modifications (PTMs). The peptidoform is represented in the USI using the standard [ProForma notation](https://github.com/HUPO-PSI/ProForma/blob/master/SpecDocument/Release_v2.0/ProForma_v2_Final.pdf). However, for the correct visualization of the PTMs in PRIDE is recommended to use the [UNIMOD](https://www.unimod.org/) accession number (Example: `[UNIMOD:214]-LHFFM[UNIMOD:35]PGFAPLTSR/3`). The PRIDE Archive USI service also supports PTM names or PTM masses. However, in those cases the system will map those values, to the closest PTM in the UNIMOD reference system. 

## How to use the USI service

The following figure How to search for a spectrum in PRIDE Archive using the USI service:

![USI Search](../markdown/usi/images/viz.png)

The service will search for the corresponding spectrum in PRIDE Archive and will display the spectrum in PRIDE Spectrum Viewer. The PRIDE Team uses the [Lorikeet](https://github.com/UWPR/Lorikeet/) library to visualize the spectra. Additionally, the service will display in a table (USI Details) the spectrum metadata, including the spectrum properties, project information and sample information.

## Reviewing spectra from private submissions 

The PRIDE Archive USI service also allows users to review spectra from private submissions. However, if a USI from a private dataset is queried, the user will be forwarded to a login page where he/she will be able to provide the reviewer/authors credentials to access the given spectrum.

The PRIDE Archive USI service will only give access to the spectrum if the user is a reviewer or author of the given submission.

## PRIDE Archive USI Architecture 

The following figure shows the architecture of the PRIDE Archive USI service:

![USI Architecture](../markdown/usi/images/architecture.png)

The PRIDE Archive USI service first look-up for identifications in PRIDE Archive indexing system that match the USI. If the USI is not found in the indexing system, the service will use the [ThermoRawFileParser Tool](https://github.com/compomics/ThermoRawFileParser) to find the given scan in the originally submitted RAW file. 

**NOTE**: If the spectrum needs to be taken from the submitted RAW file (meaning that the spectra were not provided in an open format), currently the system only supports Thermo RAW files.

A cache system allows fast retrieval of previously queried spectra.

## How to cite and use the USI service

If you submit a manuscript to a journal, and want to highlight specific novel peptide evidences (e.g. PTMs, aminoacid variants, etc.), you don't need to include the screenshot of the spectrum in the manuscript. Instead, you can use the USI service to provide a stable link to the spectrum in PRIDE Archive. For example: 

> The peptide sequence [UNIMOD:214]-LHFFM[UNIMOD:35]PGFAPLTSR/3 was identified in the spectrum [mzspec:PXD000966:CPTAC_CompRef_00_iTRAQ_05_2Feb12_Cougar_11-10-09.mzML:scan:12298:[iTRAQ4plex]-LHFFM[Oxidation]PGFAPLTSR/3](https://www.ebi.ac.uk/pride/archive/usi?usi=mzspec:PXD000966:CPTAC_CompRef_00_iTRAQ_05_2Feb12_Cougar_11-10-09.mzML:scan:12298:[iTRAQ4plex]-LHFFM[Oxidation]PGFAPLTSR/3).

If you use this service, we would be grateful if you could include the following citations in your manuscript: 

- Perez-Riverol Y, Bai J, Bandla C, García-Seisdedos D, Hewapathirana S, Kamatchinathan S, Kundu DJ, Prakash A, Frericks-Zipper A, Eisenacher M, Walzer M, Wang S, Brazma A, Vizcaíno JA. The PRIDE database resources in 2022: a hub for mass spectrometry-based proteomics evidences. Nucleic Acids Res. 2022 Jan 7;50(D1):D543-D552. doi: 10.1093/nar/gkab1038. [PMID: 34723319](https://academic.oup.com/nar/article/50/D1/D543/6415112).

- Deutsch EW, Perez-Riverol Y, Carver J, Kawano S, Mendoza L, Van Den Bossche T, Gabriels R, Binz PA, Pullman B, Sun Z, Shofstahl J, Bittremieux W, Mak TD, Klein J, Zhu Y, Lam H, Vizcaíno JA, Bandeira N. Universal Spectrum Identifier for mass spectra. Nat Methods. 2021 Jul;18(7):768-770. doi: 10.1038/s41592-021-01184-6. Epub 2021 Jun 28. [PMID: 34183830](https://www.nature.com/articles/s41592-021-01184-6).

- Hulstaert N, Shofstahl J, Sachsenberg T, Walzer M, Barsnes H, Martens L, Perez-Riverol Y. ThermoRawFileParser: Modular, Scalable, and Cross-Platform RAW File Conversion. J Proteome Res. 2020 Jan 3;19(1):537-542. doi: 10.1021/acs.jproteome.9b00328. Epub 2019 Dec 6. [PMID: 31755270](https://pubs.acs.org/doi/10.1021/acs.jproteome.9b00328).
