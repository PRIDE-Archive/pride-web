## PRIDE Utilities

Libraries and Algorithms supporting the PRIDE Database ToolSuite


## ms-data-core-api: Reading any proteomics format

The ms-data-core-api is a modular and open-source library aimed to develop computational proteomics tools. The API, written in Java,  enables rapid tool creation by providing a robust, pluggable programming interface and common data model. The data object model is based on controlled vocabularies/ontologies and captures the whole range of data types included in common proteomics experimental workflows, going from spectra and identification data to quantification results. The library contains readers of three of the most used Proteomics Standards Initiative standard file formats (mzML, mzIdentML and mzTab). In addition to mzML, it also supports the other most commonly used mass spectra formats: dta, ms2, mgf, pkl, apl (text-based), mzXML and mzData (XML-based).

It should be cited using the following reference:

Perez-Riverol Y, Uszkoreit J, Sanchez A, Ternent T, del Toro N, Hermjakob H, ... & Wang R (2015). ms-data-core-api: an open-source, metadata-oriented library for computational proteomics. Bioinformatics, 31(17), 2903-2905. [pdf](https://academic.oup.com/bioinformatics/article/31/17/2903/183125).

## pride utilities

The PRIDE Utilities module contains a series of data structures and algorithms used by all the components of the PRIDE Inspector Toolsuite and other PRIDE Projects such as PRIDE Archive libraries and PRIDE Cluster. Some of the values defined in PRIDE Utilities are the definition of the amino acid mass table, pK values and hydrophobic indexes. The module also contains the mappings between different ontology terms meaning the same concept, e.g. the b ion annotation could be annotated using the PRIDE ontology term PRIDE:0000194 or the PSI-MS ontology term MS:1001224.

These modules can homogenize all the terms and concepts used in metadata annotations. For instance, the library contains the definition of the well-established search engines and processing software and their corresponding scores in different controlled vocabularies (CVs) or ontologies.

## jmzReader

The jmzReader Library is a collection of Java APIs to parse the most commonly used MS peak list formats. Currently, the library contains parsers for:

- dta
- mgf
- ms2
- mzData
- mzXML
- pkl
- mzML
- PRIDE XML

All parsers are optimized to be used in conjunction with mzIdentML (see link in the left panel). Based on a custom build class to efficiently parse text files line by line all parsers can handle arbitrary large files in minimal memory, allowing easy and efficient processing of peak list files using the Java programming language. mzIdentML files do not contain spectra data but refer to external peak list files. All peak list parsers support the methods used by mzIdentML to reference external spectra and implement a common interface. Thus, when developing software for mzIdentML programmers no longer have to support multiple peak list file formats but only this one interface.

It should be cited using the following reference:

Griss J, Reisinger F, Hermjakob H, Vizcaíno JA (2012). jmzReader: A Java parser library to process and visualize multiple text and XML-based mass spectrometry data formats. Proteomics 12(6): 795-798. PubMed ID: 22539430.

## PIA: Protein inference toolbox

Protein Inference Algorithms (PIA) is a toolbox for MS based protein inference and identification analysis. PIA allows you to inspect the results of common proteomics spectrum identification search engines, combine them and conduct statistical analyses. The main focus of PIA lays on the integrated inference algorithms, i.e. concluding the proteins from a set of identified spectra. But it also allows you to inspect your peptide spectrum matches, calculate FDR values across different search engine results and visualize the correspondence between PSMs, peptides and proteins.

Most search engines for protein identification in MS/MS experiments return protein lists, although the actual search yields a set of peptide spectrum matches (PSMs). The step from PSMs to proteins is called “protein inference”. If a set of identified PSMs supports the detection of more than one protein in the searched database (“protein ambiguity”), usually only one representative accession is reported. These representatives may differ according to the used search engine and settings. Thus the protein lists of different search engines generally cannot be compared with one another. PSMs of complementary search engines are often combined to enhance the number of reported proteins or to verify the evidence of a peptide, which is improved by detection with distinct algorithms.

It should be cited using:

Uszkoreit J, Maerkens A, Perez-Riverol Y, Meyer HE, Marcus K, Stephan C, ... & Eisenacher M. (2015). PIA: An intuitive protein
inference engine with a web-based user interface. Journal of proteome research, 14(7), 2988-2997. [PDF](https://pubs.acs.org/doi/full/10.1021/acs.jproteome.5b00121).


## PRIDE Mod

The PRIDE Modification library is used to retrieve the protein modification information for a specific identifier from different databases: Unimod, PSI-MOD and the PRIDE Modification controlled vocabulary.

Protein post-translational modifications (PTM) increase the functional diversity of the proteome by the covalent addition of functional groups or proteins, proteolytic cleavage of regulatory subunits or degradation of entire proteins. These modifications include phosphorylation, glycosylation, ubiquitination, nitrosylation, methylation, acetylation, lipidation and proteolysis and influence almost all aspects of normal cell biology and pathogenesis. Therefore, identifying and understanding PTMs is critical in the study of cell biology and disease treatment and prevention.

In addition to PTMs, there are other artefactual protein modifications that are added due to the experimental protocol followed by the researchers. Some examples are carbamydomethylation or oxidation. The proteomics community has developed tow major resources for protein modifications

(including PTMs): Unimod and PSI-MOD. However, modification identifiers from these two resources are not trivial to map since some of the modification in Unimod are not present in PSI-MOD and vice versa. Also, every search engine uses their notation and either Unimod or PSI-MOD. The PRIDE Modification library is used to retrieve the modification information for a specific identifier from different databases: Unimod, PSI-MOD and the PRIDE Modification controlled vocabulary (internal nomenclature used in PRIDE tools). This library is now used by different tools and pipelines.
