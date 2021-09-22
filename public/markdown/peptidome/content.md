## PRIDE Peptidome

## What is PRIDE Peptidome 

PRIDE Peptidome is a condensed view of high-quality evidences of PRIDE Archive projects. Peptides in PRIDE Peptidome are the combination between the peptide evidence and a Uniprot protein accession. 

## Where the data come from?

The original peptide spectrum match comes from PRIDE Archive, which is a submission based data repository. For a submission to be included in PRIDE Peptidome the submission **must be** COMPLETE and PUBLIC, which means that the peptide spectrum matches (PSMs) are exported in an standard file format such as mzTab or mzIdentML (please read the guidelines about COMPLETE Submissions in PRIDE). 

## High-quality PSMs at Project level 

### FDR calculation. 

PRIDE Peptidome use the Protein inference toolkit (PIA) to estimate the FDR for each PSMs on each Project. For the PSM level FDR calculation, first a search engine (or other pre-processing) score, e-/p-value or probability (base score in the remaining text) needs to be provided. Furthermore, an accession pattern for the decoys needs to be given. Sometimes, a search engine provides an internal approach for the decoy generation, like Mascot, which is also supported and needs to be selected if appropriate.

Based on the selected score and the decoy pattern, the list of PSMs is first sorted and traversed in descending order, starting with the highest scoring PSM. The FDR is calculated by the formula: **nrDecoys_i / nrTargets_i** up to each PSM index i. Here, the index allows multiple PSMs to be on the same position, while the following index is always the prior index + number of PSMs at the prior index. Thus, it is assured that if several PSMs have the same score, all of these get the same FDR assigned.

Additionally, to the FDR, also the FDR q-value is calculated for each index, which is the lowest possible FDR value in the score sorted list of PSMs at or after the given index.

Finally, to smooth the FDR distribution and combine results of several search engines or MS runs, the FDR Score and combined FDR Score (Jones et al 2009, Proteomics, PMID: 19253293) can be calculated. In brief, for the FDR score an average FDR Score which is interpolated between search engine scores is calculated. For the combined FDR score, the n-th root of spectrum matches from n different search engine results for the same spectrum is used as the basis for a merged FDR calculation. The (combined) FDR Score can afterwards be handled like a normal FDR value. E.g. filtering at a 0.01 (1%) level is commonly applied at the moment.

Due to the fact, that in special circumstances the number of decoys rises faster than the targets, especially at the end of a descending score sorted list (e.g. when using huge databases like in metaproteomics or when analysing very noisy data), the FDR Score can reach values higher than 1.0.

### FDR filtering and extra quality filters

All PSMs are filtered at 1% FDR (FDR-score lower than 0.001). Additionally, the following rules are applied: 
  - peptides with less than 8 amino acids are removed as suggested by previous HUPO proteome guidelines.
  - Peptides that do not map to a Uniprot protein are removed. 

## SparkMS 

The [SparkMS](https://github.com/bigbio/sparkMS) is a pyspark library and set of tools that enables to group millions of PSMs from multiple projects into a peptide+protein entity. The library implements most of the filtering steps previously described and also enables to map peptides to uniprot accessions.  

## Web browsable API

The PRIDE Peptidome RESTful API is web browsable, which means that:

The query results returned by the API are available in JSON format. This ensures that they can be viewed by human and accessed programmatically by computer.

The main RESTful API page provides a simple web-based user interface, which allows developers can familiarise themselves with the API and get a better sense of the PRIDE Peptidome data before writing single line of code.
