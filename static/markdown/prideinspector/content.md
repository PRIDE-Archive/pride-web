## PRIDE Inspector: Reviewing public proteomics data

The GUI (Graphical User Interface) module of the PRIDE Inspector is organized in the form of several views, where each of them focuses on a particular aspect of the data.

[DOWNLOAD TOOL](https://github.com/PRIDE-Toolsuite/pride-inspector/releases/download/pride-inspector-2.5.4/pride-inspector-2.5.4.zip)

There are currently six views:

1. ‘Overview’ view – shows experimental metadata

2. Protein view – shows protein identifications

3. Peptide view – shows peptides used to generate the protein identifications

4. Spectrum view – shows spectra and chromatograms

5. Quantification view – show quantitative data for both proteins and peptides

6. ‘Summary charts’ view – provides data chars for assessing data quality

To enable a maximum reusability, each view is implemented as an independent component using [Java Swing](http://download.oracle.com/javase/tutorial/uiswing/). This way, more views can be added easily in the future.

[Inspector-mzgraph-browser](https://github.com/PRIDE-Toolsuite/inspector-mzgraph-browser), the component responsible for visualizing spectra and chromatograms, is released and available as self-contained Java library and distributed as part of the PRIDE Inspector. Both this component and the statistical charts in the ‘Summary Charts’ view, are implemented using the [JFreeChart](http://www.jfree.org/jfreechart/) API.

Next to the previous six layers, a generic application management framework maintains the context and information shared by the whole environment. It consists of features frequently required by medium or large Java Swing based applications, such as: lifecycle services for background tasks, in-memory caching, event bus, user property management and error handling. The framework is independent from the PRIDE Inspector and therefore can be reused for other rich client applications.

## Visualising Peptide/Protein Information

### PSMs

The ‘Peptide View’ tab includes the information at the PSM level for every peptide sequence. The Peptide Table panel shows for each peptide the list of PSMs with the corresponding scores from the search engines, the list of modifications, precursor charge and precursor mass. In the example each PSM contains the the OMSSA and XTandem corresponding scores. Additionally, the table provides the information about the peptide sequence length and start and end position in the protein sequence.

![PSMs Information](../static/markdown/prideinspector/files/peptideTable2.png)

### Peptide Information

The Peptide Table also provides information about each protein identified in the file. It provides information about the peptide sequence,  protein identifiers, sequence length, isoelectric point, number of PSMs and protein modifications summary.

![Peptide Table](../static/markdown/prideinspector/files/peptideTable.png)

### Protein Information

The protein panel shows all the information about identified proteins including e.g. protein level scores, protein sequences, protein identifiers, number of PSMs for each protein, modifications and number of unique peptides. The first column is organised as a three table structure, when the protein inference information is provided (![](../static/markdown/prideinspector/files/plus.png)). If users click in the triangle the corresponding protein group is collapsed.

![Protein Table](../static/markdown/prideinspector/files/proteinTable.png)

Finally, the sequence coverage is shown in a different column for each protein:

![Protein Sequence coverage](../static/markdown/prideinspector/files/coverage.png)

## PRIDE Inspector metadata

PRIDE Inspector ‘Overview’ panel: ‘Experiment General View’. The tab contains basic metadata information included in a given file: experiment and project titles, contact information, software used for the file generation and original file formats, among others.

![General Experiment Data](../static/markdown/prideinspector/files/metadata1.png)

PRIDE Inspector ‘Overview’ panel: ‘Sample & Protocol View’. This tab contains metadata information about the sample/s (species, tissues, etc) and the experimental protocol.

![](../static/markdown/prideinspector/files/metadata2.png)

PRIDE Inspector ‘Overview’ panel: ‘Instrument & Processing View’. This tab contains metadata information about the instrument configuration and software used.

![](../static/markdown/prideinspector/files/metadata3.png)

PRIDE Inspector ‘Overview’ panel: ‘Identification Protocol View’. This tab contains metadata information about the peptide/protein identification protocols such as search parameters, protein sequence databases, search engines and other software used.

![](../static/markdown/prideinspector/files/metadata4.png)

## Protein Sequence Panel

In MS proteomics based experiments, potentially identified proteins are reported using the searched database’s proprietary identifiers. These identifiers are unstable and can change or may even be deleted over time. The latter happens if, for instance, hypothetical proteins are removed when gene prediction algorithms are updated or new biological evidence is created.

A few years ago we investigated the impact of changing protein identifiers on stored proteomics data over time. We found that in several cases 10-20% of the reported identifiers were no longer valid after only a year after the experimental results had been published. To highlight this problem to the user as well as to keep the reported data usable, PRIDE Inspector Toolsuite has a function to automatically check the reported protein identification’s status.

To do this we integrated specific components that access the identifications source database and retrieve the current identifier status.

If the protein identifier was only updated, the new accession is automatically displayed in the protein table and the updated sequence retrieved. In some cases, even though a protein’s identifier did not change, its underlying sequence was altered in the protein sequence database. Therefore, PRIDE Inspector automatically fetches a given protein’s current sequence and checks whether the reported peptides still fit this sequence.

![Protein Sequence Status and Update](../static/markdown/prideinspector/files/proteinSequence.png)

When using the **Obtain Protein Details** feature in the PRIDE Inspector, the information about the status of the protein according to the original database is retrieved in addition to the protein name and protein sequence. It could be one of the following cases:

     - Active: the protein still exists in the original database, and the details remain unchanged.
     - Unknown: the protein does not exist in the original database.
     - Deleted: the protein has been removed from the original database.
     - Merged: the protein has been merged with other proteins to form a new protein.
     - Demerged: the protein has been split into two or more proteins.
     - Changed: there have been some changes on this protein, but the type of the change is unknown.
     - Error: there is an error associated with this protein.

To summarize, there are three main outcomes associated for a protein’s status: active, changed and deleted. For UniProtKB (UniProt KnowledgeBase) changed identifiers are subdivided in merged and demerged identifiers. The main reason for the demerging of identifiers is that new identifiers were created for every species a protein was identified in as well as new identifiers for the various genes a protein can come from. The merging of identifiers mainly happens when based on new gene prediction algorithms proteins that were previously believed to be distinct are then considered to actually come from the same gene.

## How to perform protein inference

The PRIDE Inspector provides a home screen where users can select the option of opening the corresponding identification file supporting the formats PRIDE XML, mzIdentML and mzTab:


![PRIDE Inspector Home Page](../static/markdown/prideinspector/files/option.png "PRIDE Inspector Home Page")

If users are visualising an mzIdentML without protein inference information the tool will popup a message to run the protein inference algorithm:


![Protein Inference option](../static/markdown/prideinspector/files/inference.png "Protein Inference option")

When the algorithm finishes the protein panel shows the list of identified proteins, including the new protein groups and the proteins that belong to them. The "Show Protein Inference Option" provides a new popup with the protein inference visualisation:

![Protein Visualisation Panel](../static/markdown/prideinspector/files/proteins.png "Protein Visualisation Panel")

The final aim of the pride-protein-inference library and PRIDE Inspector tool is to show the protein inference information to the final users. Especially the information for each protien group and the number of PSMs and peptides shared by interesting proteins can be seen using the "Protein Inference Visualisation" panel:

![Protein Inference Visualisation](../static/markdown/prideinspector/files/viz.png "Protein Inference Visualisation")

## Protein inference Panel

Detailed protein inference information can either be included or not in mzIdentML and mzTab files. In mzIdentML, this information is detailed if ‘Protein Groups’ are reported. The "Protein inference panel" shows the identified proteins, peptides and PSMs included in a particular protein group. The panel can be used to select the proteins and show the identified peptides and PSMs with the corresponding scores and metadata (e.g. modifications, sequence). The ‘score threshold panel’ enables filtering by PSM score and therefore, to remove evidences below a particular score threshold. The ‘Protein inference panel’ also enables the visualisation of the shared peptides and PSMs between the proteins that belong to a particular protein group.

The visualisation is composed of nodes, representing either proteins/accessions (rectangular, green), peptides (orange, rounded corners), PSMs (light blue, rounded corners) or just connecting nodes (blue circles). The colour and thickness of the edges as well as whether a shape is filled and the filling colour describe the relation to the selected protein.

A selected protein (or protein group) is highlighted by a red border and is filed in dark green. All peptides belonging to the selected protein are filled in vivid orange, the PSMs in vivid light blue, both also with black borders. Proteins, which are sub-proteins (i.e. all PSMs are also contained in the selected protein) are filled in green without border. Super-proteins (which contain every PSM/peptide of the selected) are also in pastel green with dark green border, and “siblings” (having the same super-proteins) are in pastel green with black border. Peptides and PSMs, which are not contained in the selected but in a super-protein, are filled in pastel with a dark border. Proteins, peptides and PSMs, which have no relation to the currently selected, but are not filtered out, have a thick dark border and no filling. If a PSM, peptide or even protein is filtered out due to the score threshold, the corresponding node has no filling and a thin, black border.

![Protein Inference Panel](../static/markdown/prideinspector/files/proteinInferencePanel.png)

The "Protein Inference panel" has options for node picking and transforming and also zoom in and out functionality are enabled. Different colours and shapes are used for proteins (green rectangles), peptides (orange rectangles), PSMs (blue rectangles) and protein groups (blue circles).

## Fragmentation annotation

### The algorithm

The cumulative binomial probability (P) (Equation 1) represents the probability of randomly matching at least the given number of fragment ions to the tandem mass spectrum, which is calculated by using the total number of fragment ions for the given peptide (N), the number of ions matched to the spectrum (n) and the probability of matching a peak (p).

![Probability](../static/markdown/prideinspector/files/formulaF1.png)

To make the scores more human readable, the result from Equation 1 (Pi) is transformed to a logarithmic scale and the final PeptideScore(i) is obtained (Equation 2):

![PeptideScore](../static/markdown/prideinspector/files/formulaF2.png)

This entire process is repeated in 10 iterations. In each loop different peak depths (i) are chosen to calculate the cumulative binomial probability and finally ten different  are generated. A different weight is assigned for each score (1 = 0.5; 2 = 0.75; 3 = 1; 4 = 1; 5 = 1; 6 = 1; 7 = 0.75; 8 = 0.5; 9 = 0.25; and 10 = 0.25), and then a weighted average score called peptide score is generated.

The pipeline:

![The fragment annotation pipeline](../static/markdown/prideinspector/files/fragmentPipeline.png)

### Fragmentation annotation rules

For the matched peaks, a rule-based expert system is used to filter them. These are the main rules used:

  - Ignore annotations for internal fragments, immonium ions and side chain ions
  - If fragmentation is not coming from HCD or CID instruments, remove the parent ions from the candidate list
  - If the user chooses water loss or other neutral loss, add annotation with water loss or neutral loss into the candidate list
  - If peptide charge is 1+, add 1+ annotation charge into candidate list
  - If peptide charge is 2+, add 1+ and 2+ annotation charge into candidate list
  - If peptide charge is greater than 2+, Ignore 3+ annotation charge, only add 1+ and 2+ annotation charge into the candidate list
  - Align different prior weights for different annotation ion types: b ions (100), y ions (99), parent ions (98), a ions (97), x ions (96), c ions (95), z ions (94). Choose the highest weighted annotation, if there is more than one candidate
  - The m/z chart shows the delta mass between the annotated ion and the experimental mass of the peak

## PRIDE QC Plots

PRIDE Inspector Toolsuite ‘Quality Chart’ is a library to provide quality charts for quality assessment of MS/MS proteomics experiments ranging from spectrum and peptide/protein identifications to quantitation results. It provides at present nine charts: Delta m/z, Number of peptides identified per protein, Number of missed tryptic cleavages, Average MS/MS Spectrum, Precursor ion charge distribution, Precursor ion masses distribution, Number of peaks per spectrum, Peak intensity distribution and Quantitation variables distribution per peptides. For all the charts five different categories are used: unidentified spectra, identified spectra, target identifications, decoy identifications, all spectra.

### Delta m/z

This chart represents the distribution of the relative frequency of experimental precursor ion mass (m/z) - theoretical precursor ion mass (m/z). Mass deltas close to zero reflect more accurate identifications and also that the reporting of the amino acid modifications and charges have been done accurately. This plot can highlight systematic bias if not centered on zero. Other distributions can reflect modifications not being reported properly. Also it is easy to see the different between the target and the decoys identifications.

![Delta Mass Chart](../static/markdown/prideinspector/files/delta.png)

In Figure 1, we can clearly see that the distribution for this experiment is centred close to zero with for target identifications, but for decoy identifications peaks at 0.5 and around 0.7 m/z units show that are wrong identifications. Peptide sequences, charges and modifications, have been accurately reported and the instrument calibration was fine.

### Distribution of Peptides per Proteins

This is a bar chart displaying the percentage of protein identifications in the whole experiment according to the total number of peptides used to report the identification. Proteins supported by more peptide identifications can constitute more confident results.

**Note**: To investigate further, in the Protein view, one can sort the proteins by number of peptide identifications.

![Peptides Per Proteins](../static/markdown/prideinspector/files/peptidesproteins.png)

In the experiment represented in Figure 2, 60% of the proteins were identified through one PSM only. The rest of the protein identifications, especially the ones with higher peptide numbers can be considered more reliable identifications.

### Number of Missed Tryptic Cleavages

This is a histogram representing the percentage of peptides in the experiment with a different number of missed tryptic cleavages in peptides. This graph is only applicable to experiments where trypsin is used. Two assumptions were made for these calculations: first, the enzyme used in the experiment is trypsin; second, the cleavage rule used by the enzyme is “C-terminal side of K or R except if P is C-term to K or R”. This chart can be used to compare several experiments where the same number of missed cleavages has been used as a parameter for the search, and the same experimental conditions used. Then a dramatic change in the shape of the chart could mean a change in the efficiency of the trypsin used (though many other factors can also be the reason for it, such as a change in the parameters of the search engine, database size and other experimental causes).

In a more practical way, this chart has two immediate applications: first, checking that the search engine is working correctly and the number of missed cleavages found in the identified peptides matches with the "missed cleavages" parameter used in the search engine. Second, by knowing the distribution of this chart, the researcher can adjust the number of missed cleavages used in future searches: e.g. maybe the use of 4 missed cleavages instead of 1 is producing only a 0.1% increase in peptide identifications with searches that are 10 times longer.

![Miss-cleavages](../static/markdown/prideinspector/files/misscl.png)

Figure 3 shows an example where only about 72% of the target peptides do not have a missed cleavage. However, it is interesting to see that most of the decoy identifications contain missed cleavages.

### Average MS/MS spectrum

This graph is obtained adding all the MS/MS spectra in a given experiment. The result is an averaged spectrum. The highest peaks will reflect abundant and intense peaks in the overall set of MS/MS spectra. Most intense and ubiquitous peaks (both conditions needed) will be displayed here: contaminants, reagents used in the experiment, frequent fragmentations from highly common peptides. The next chart (Figure 4) shows an example of a public experiment in PRIDE, using iTRAQ reagents for quantification. The zoom has been used to show in detail the highlighted information.

![Spectrum average](../static/markdown/prideinspector/files/spectrum-average.png)

### Precursor Ion Charge

This is a bar chart representing the distribution of the precursor ion charges for a given whole experiment. This information can be used to identify potential ionization problems including many 1+ charges from an ESI ionization source or an unexpected distribution of charges. MALDI experiments are expected to contain almost exclusively 1+ charged ions. An unexpected charge distribution may furthermore be caused by specific search engine parameter settings such as limiting the search to specific ion charges.

![Precursor Ion charge](../static/markdown/prideinspector/files/ion-charge.png)

In this ESI experiment there are no single charged ions but only double and triple charged ones.

### Precursor Ion Masses

This chart represents a relative frequency distribution of precursor ion masses for the experiment (red curve) against a reference (if selected by the user). It is possible to filter the information for all, identified and unidentified spectra. Three references are available for the users:

   1- Empirically derived precursor ion mass distributions from PRIDE experiments that have a single tryptic digest step annotation associated with them and its upper and lower quartiles. This reference is aimed to provide a species independent distribution.

   2- Reference obtained in an analogous way from PRIDE human experiments.

   3- Reference obtained in an analogous way from PRIDE mouse experiments.

Experiments that only contained peptides without missed cleavages were ignored as such results are caused by specific search engines parameters and do not reflect the biological background. These peptides are generally shorter and thus these experiments would shift the overall distribution towards the lower masses.

A curve that lies to the left of the empirical distribution (in a different colour) identifies a disproportionate number of lower mass peptides being identified/ fragmented. In an analogous way, a curve that lies to the right of the empirical distribution identifies a disproportionate number of higher mass peptides being identified/ fragmented. Such alterations may be caused by the general amino acid composition of the organism being investigated, or the digestion protocol used (non-tryptic) but does not necessarily indicate a problem in your experiment.

![Precursor Ion Mass Distribution](../static/markdown/prideinspector/files/precursorMass.png)

For human, the average tryptic peptide mass is 1,100 Da. This distribution should encompass this average. A shift to the right in this distribution should be expected due to a number of missed cleavages resulting in higher mass peptides.

### Peaks per MS/MS spectrum

This chart represents a histogram containing the number of peaks per MS/MS spectrum in a given experiment. This chart assumes centroid data. Too few peaks can identify poor fragmentation or a detector fault, as opposed to a large number of peaks representing very noisy spectra. This chart is extensively dependent on the pre-processing steps performed to the spectra (centroiding, deconvolution, peak picking approach, etc). The example shown in Figure 7 shows that poor quality spectra are more likely to be decoy identifications that target identifications.

![Peaks per MS/MS](../static/markdown/prideinspector/files/peaks.png)

### Peak Intensity Distribution

This is a histogram representing the ion intensity vs. the frequency for all MS2 spectra in a whole given experiment (Figure 8). It is possible to filter the information for all, identified and unidentified spectra. This plot can give a general estimation of the noise level of the spectra. Generally, one should expect to have a high number of low intensity noise peaks with a low number of high intensity signal peaks. A disproportionate number of high signal peaks may indicate heavy spectrum pre-filtering or potential experimental problems. In the case of data reuse this plot can be useful in identifying the requirement for pre-processing of the spectra prior to any downstream analysis. The quality of the identifications is not linked to this data as most search engines perform internal spectrum pre-processing before matching the spectra. Thus, the spectra reported are not necessarily pre-processed since the search engine may have applied the pre-processing step internally. This pre-processing is not necessarily reported in the experimental metadata.

![Peaks Intensity Distribution](../static/markdown/prideinspector/files/peaksInt.png)

### Peptide per Ratio

The Peptide per Ratio is a chart representing the peptide distribution versus the study variables in the quantitation experiment. It shows the differences between all the replicates and samples for every peptide. In addition, it shows the relation between different conditions globally. The following example shows the differences between all the samples in an 8-plex iTRAQ experiment.

![Peptide per Ratio](../static/markdown/prideinspector/files/peptideRatio.png)

## Searching datasets in PRIDE

PRIDE Inspector ‘Search PRIDE’ Panel. This panel gives access to the public PX ‘Complete’ submissions available in PRIDE.

Users can search (Search box) using metadata information such as species, tissue, publication, and project title, among others.

If users select a given Project, all the assays (files) corresponding to the selected dataset are shown. Then, users can download the files using the corresponding download button.

![Search Data in PRIDE](../static/markdown/prideinspector/files/search.png)

Users can remove the search terms in the right side of the screen.

## Videos

[![PRIDE Inspector Toolsuite: Peaks File](http://img.youtube.com/vi/gdWd03yFpVE/0.jpg)](http://www.youtube.com/watch?v=gdWd03yFpVE) [![PRIDE Inspector Toolsuite: Peaks File](http://img.youtube.com/vi/38OUn2oox6c/0.jpg)](https://www.youtube.com/watch?v=38OUn2oox6c)
