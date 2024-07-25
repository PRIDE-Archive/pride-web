## How to submit complete crosslinking dataset

Crosslinking data submitted to PRIDE will receive complete submission status when the project meets the following criteria (in addition to the existing criteria at https://www.ebi.ac.uk/pride/markdownpage/submitdatapage):

1. **Identifications MUST be provided as valid mzIdentML 1.2.0 files.** That is, all mzIdentML files must validate against the mzIdentML 1.2.0 schema, located at https://github.com/HUPO-PSI/mzIdentML/blob/master/schema/mzIdentML1.2.0.xsd. Tools which validate XML files against an xsd schema include: https://validator.w3.org/#validate_by_upload+with_options.

2. **The mzIdentML files SHOULD be semantically valid.** That is, the use of CV terms should conform to the requirements of the mzIdentML 1.2.0 specification document. An official semantic validator for mzIdentML 1.2.0 has been developed: https://github.com/HUPO-PSI/mzIdentML/tree/master/validator. Files which have semantic validation errors but which can, none the less, be read by the repository’s processing software (https://github.com/PRIDE-Archive/xi-mzidentml-converter) will receive ‘complete submission’ status but with a warning.  

3. **The peaklist data MUST be submitted as .mgf, .mzML or .ms2.** These are the peaklist files exactly as searched.

4. **The mzIdentML files MUST correctly reference the submitted peaklists.** It must be possible to identify and read the spectrum for each identification based on the information in the mzIdentML file, see Section 5.1.2 of the mzIdentML 1.2.0 specification document.

5. The accession attribute of target <DBSequence> elements  SHOULD be a [valid uniprot accession](https://www.uniprot.org/help/accession_numbers)**, if it is a natural protein that has an accession number**. That is, the value of the accession attribute for <DBSequence> elements should match the regular expression: [OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}

6. Every **&lt;**DBSequence**&gt;** element that describes a target protein MUST include the protein sequence in a **&lt;**Seq**&gt;** subelement. This is the protein sequence in the protein database used to perform the analysis.

## Limitations of Support

1. Information in mzIdentML files on scores and the passing of thresholds at higher levels of consolidation (unique peptide; crosslink level; PPI) are not processed by https://github.com/PRIDE-Archive/xi-mzidentml-converter, only the PSM level scores/threshold passes.

2. Doesn’t read linked FASTA files, hence item **(6)** above. 

3. Doesn’t support the “combined spectra file type” from mzIdentML 1.2.0

## Tools Supporting PRIDE Crosslinking Data Submission

While multiple tools can be used to analyze crosslinking data, only the following tools have been tested and produce valid files that can be loaded into the PRIDE crosslinking resource:

- [xiSEARCH and xiFDR](https://www.rappsilberlab.org/software/xisearch/): xiSEARCH is a library of routines for peptide-based mass spectrometry, prominently featuring a search engine for identifying crosslinked peptides. xiFDR is a tool for calculating false discovery rates for crosslinked peptides. [Example dataset: PXD019437](https://www.ebi.ac.uk/pride/archive/projects/PXD019437)
- [Scout](https://github.com/diogobor/Scout): Scout is a computational methodology that facilitates interactomic analysis by identifying mass spectra of peptides linked with cleavable cross-linking reagents. Utilizing machine learning techniques, Scout ensures a controlled false discovery rate (FDR) at multiple levels, including cross-linked spectrum matches, residue pairs, and protein-protein interactions (PPIs).

> Note: If you have used a different tool to analyze your crosslinking data, please contact the PRIDE team at pride-support@ebi.ac.uk to discuss the possibility of submitting your data to the PRIDE crosslinking resource.



