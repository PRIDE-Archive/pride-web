## Sample and Data Relationship Format (SDRF-Proteomics)

The Sample and Data Relationship Format (SDRF-Proteomics) is a tab-delimited text format that describes the relationship between samples and data files. Every submission in ProteomeXchange MUST provide the instrument and result files in addition to the metadata related to the project (Figure 1). The SDRF-Proteomics is the format that aims to store the relation between the samples analyzed in the experiment and the corresponding instrument files. 

![Submission files](../markdown/sdrf/images/sample-metadata.png)

**Figure 1**: SDRF-Proteomics file format stores the information of the sample and its relation to the data files in the dataset. The file format includes not only information about the sample but also about how the data was acquired and processed.

### SDRF-Proteomics Specification

The SDRF-Proteomics format describes the sample characteristics and the relationships between samples and data files included in a dataset. The information in SDRF files is organised so that it follows the natural flow of a proteomics experiment. The main requirements to be fulfilled for SDRF-Proteomics format are:

The SDRF file is a tab-delimited format where each ROW corresponds to a relationship between a Sample and a Data file (and MS signal corresponding to labelling in the context of multiplexed experiments).


![SDRF in nutshell](../markdown/sdrf/images/sdrf-nutshell.png)

### Relationship to other specifications

SDRF-Proteomics is fully compatible with the SDRF file format part of MAGE-TAB. MAGE-TAB is the file format used to store metadata and sample information for transcriptomics experiments. When the proteomeXchange project file is converted to idf file (project description in MAGE-TAB) and is combined with the SDRF-Proteomics a valid MAGE-TAB is obtained.

SDRF-Proteomics sample information can be embedded into mzTab metadata files. The sample metadata in mzTab contains properties as the columns in the SDRF-Proteomics and values as Sample cell values.

The SDRF-Proteomics aims to capture the sample metadata and its relationship with the data files (e.g. raw files from mass spectrometers). The SDRF-Proteomics does not aim to capture the downstream analysis part of the experimental design such as what samples should be compared, how they can be combined or parameters for the downstream analysis (FDR or p-values thresholds). The HUPO-PSI community will work in the future to include this information in other file formats such as mzTab or a new type of file format.

### Ontologies/Controlled Vocabularies Supported

The list of ontologies/controlled vocabularies (CV) supported are:

- PSI Mass Spectrometry CV (PSI-MS)
- Experimental Factor Ontology (EFO).
- Unimod protein modification database for mass spectrometry
- PSI-MOD CV (PSI-MOD)
- Cell line ontology
- Drosophila anatomy ontology
- Cell ontology
- Plant ontology
- Uber-anatomy ontology
- Zebrafish anatomy and development ontology
- Zebrafish developmental stages ontology
- Plant Environment Ontology
- FlyBase Developmental Ontology
- Rat Strain Ontology
- Chemical Entities of Biological Interest Ontology
- NCBI organismal classification
- PATO - the Phenotype and Trait Ontology
- PRIDE Controlled Vocabulary (CV)

### SDRF Additional documentation 

The official website for SDRF-Proteomics project is https://github.com/bigbio/proteomics-metadata-standard. The website includes the specification of the file format, examples and tools to validate the files. A set of examples and annotated projects from ProteomeXchange can be found here: https://github.com/bigbio/proteomics-metadata-standard/tree/master/annotated-projects

Multiple tools have been implemented to validate SDRF-Proteomics files for users familiar with Python and Java:

- sdrf-pipelines (Python—https://github.com/bigbio/sdrf-pipelines): This tool allows validating an SDRF-Proteomics file. In addition, it allows converting SDRF to other popular pipelines and software configure files such as MaxQuant or OpenMS.

- jsdrf (Java—https://github.com/bigbio/jsdrf): This Java library and tool allows validating SDRF-Proteomics files. It also includes a generic data model that can be used by Java applications.

