## PRIDE Archive Identification Results

PRIDE Archive result page is an application to visualize and perform a first quality assessment of MS data. Users and Researchers can now have a close look to a deposited dataset.


## Protein Identification results

</br>

![Protein Identification Page](../static/markdown/resultpage/files/protein-panel.png)

The protein panel shows all the information about identified proteins:

- Accession: Reported accession used in the experiment.
- Peptides : Number of reported peptides for protein (*)
- PSMs (*)
- Coverage: Percentage of the protein sequence identified. This number will be available only if the sequence of the peptide has been submitted with the result files (mzIdentML or mzTab).
- Assay: Assay where the protein has been identified.
- Confidence score: [Protein confidence score](./resultpage#protein_confidence_score)
- Valid: [Protein validated by PRIDE Pipelines](./resultpage#validated_by_pride_pipelines)

(*) A peptide is considered the combination of a Peptide Sequence and a set of Post-translational modifications (PTMs). For example the, the following peptides NTSVTSLPFVDTKGK, NTSVTSLPFVDTKGK[Unimod:1], NTSVTSLPFVDTK[Unimod:1]GK[Unimod:1] are consider as different.

## Search panel

In the protein table, a search functionality has been implemented. The user can search by Protein identifier. The clean button ![Protein Identification Page](../static/markdown/resultpage/files/search-clean.png) clean the search results and restore all the proteins identified in the dataset.

![Protein Identification Page](../static/markdown/resultpage/files/search-panel-protein.png)


## Protein Confidence Score

For the protein level, the PRIDE pipelines perform an inference step using Occam's Razor algorithm from [PIA toolsuite](./resultpage#references). First, a PSM level (PSM combined FDR score) base score for the calculation of the final protein score is computed. Also, the PSMs are filtered by PSM level FDR 5% before protein inference. The protein score is the log10 of the product of each peptide's best PSM value. (Actually, to be numerical consistent, the log10 values of the peptides are added up.) So, also here a higher protein score means better evidence for the respective protein.

## Protein Sequence Panel

When a protein is selected in the Protein Identification result Table, the sequence is load into the Sequence panel:

![Protein Identification Page](../static/markdown/resultpage/files/sequence-panel.png)

 After the sequence is load into the Sequence panel, all the identified peptides are mapped into the sequence. The result of the mapping is also highlighted in the sequence panel:

 - Fit: For peptides with a sequence that correctly map the protein sequence.
 - Fuzzy Fit: For peptides with a sequence that partially map into the protein sequence (one or more amino acid miss-matches)
 - PTMs: Post-translation modifications map to the correct position in the protein sequence.

## Validated by PRIDE Pipelines

When a Complete submission is perform, a set of RESULT files (mzIdentML, mzTab or PRIDE XML) are deposited with the dataset. Each RESULT file is associated with an Assay for Complete submissions. PRIDE Archive pipelines load all the protein, peptides and spectra into a database but before it applies a set of pipelines to statistically assess the quality of the deposited results. The quality control of the deposited results is based on the Target/Decoy strategy. PRIDE pipelines use the [PIA toolsuite](./resultpage#references) to translate any search engine score into a PSM combined FDR and [Protein confidence score](./resultpage#protein_confidence_score). The first premise to be validated by PRIDE pipelines is that **decoy information** is present in the RESULT file.

Some of the RESULT files deposited in PRIDE do not contains decoy information, this can be the case of some PRIDE-XML RESULT files and also mzIdentML files filtered by the search engines to remove the decoy PSMs. Without the **decoy information**, PRIDE pipelines can not compute the FDR of PSMs, Peptides and Proteins; making the evidences **NOT Valid**.

If the **decoy information** is present, PRIDE pipelines estimates the [Combined PSM FDR](./resultpage#combined_psm_fdr) and filter the Peptide Spectrum Matches (PSMs) at 1% FDR.

## Combined PSM FDR

For the PSM level FDR calculation, first a search engine (or pre-processing) score or probability needs to be provided. Furthermore, an accession pattern for the decoys needs to be given (unless the search engine internal approach is used, which needs to be selected if appropriate).

Based on the selected score/probabilty and the decoy pattern, the list of PSMs is first sorted and traversed in descending order, starting with the highest scoring PSM. The FDR is calculated by the formula: nrDecoys_i / nrTargets_i up to each PSM index i. The index assures, that if several PSMs have the same score/probability, all of these get the same FDR assigned.

Additionally to the FDR, also the FDR q-value is calculated for each index, which is the lowest possible FDR value in the score sorted list of PSMs at or after the given index.

Finally, to smooth the FDR distribution and combine results of several search engines or MS runs, the FDR Score and combined FDR score [Jones et al 2009, Proteomics](./resultpage#references) can be calculated. In brief, for the FDR score an average FDR Score which is interpolated between search engine scores is calculated. For the combined FDR score, the n-th root of spectrum matches from n different search engine results for the same spectrum is used as basis for a merged FDR calculation. If an alternative or more advanced method for the estimation of false positives on PSM level, like Percolator or the calculation of posterior error probabilities, was externally applied to the PSMs, the FDR calculation performed by PIA needs not to be executed at all.

## Peptide level FDR

For the peptide level, basically the same options as for the PSM level FDR calculation are given. The only difference is, that the PSMs are merged together into peptides based on the amino acid sequence and, if selected, also the PTM states. Additionally to the search engine scores, the PSM level (combined) FDR score can be used as basic score for the FDR calculation.

Before the merge into peptides and therefore before the peptide level FDR calculation, all PSMs above a PSM level FDR threshold can (and should) be filtered. For this filtering also a basic search engine score, Percolator values or PEPs can be used, if no PSM level FDR calculation was performed or needed.

## Peptide Identification results

The Peptide Table also provides the information about each protein identified in the project. It provides information about the peptide sequence, protein identifier, sequence length, number of PSMs, and [Peptide level FDR](./resultpage#peptide_level_fdr).

![Peptide Identification Page](../static/markdown/resultpage/files/peptide-table.png)

In the peptide table, [the search panel](./resultpage#search_panel) allows user to search for peptide sequences in the Peptide Table. The Peptide Sequence in the table highlights ![the post-translational modifications](../static/markdown/resultpage/files/ptm-peptide.png).

## Peptide Spectrum Matches

Similar to the peptide table, the peptide spectrum matches (PSM) table shows the peptide information plus the charge state. When a PSM is selected the corresponding Spectrum is shown in the [Spectrum Panel](./resultpage#spectrum_panel)

![PSM Identification Page](../static/markdown/resultpage/files/psm-table.png)

## Spectrum Panel

![PSM Identification Page](../static/markdown/resultpage/files/spectra.png)

## References

- PIA Toolsuite: Uszkoreit, J., Maerkens, A., Perez-Riverol, Y., Meyer, H. E., Marcus, K., Stephan, C., ... & Eisenacher, M. (2015). PIA: an intuitive protein inference engine with a web-based user interface. Journal of proteome research, 14(7), 2988-2997.
- Jones et. al. 2009, Proteomics: Jones, A. R., Siepen, J. A., Hubbard, S. J., & Paton, N. W. (2009). Improving sensitivity in proteome studies by analysis of false discovery rates for multiple search engines. Proteomics, 9(5), 1220-1229.
