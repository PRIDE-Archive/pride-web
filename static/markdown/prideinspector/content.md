## PRIDE Inspector: Reviewing public proteomics data

The GUI module of the PRIDE Inspector organizes itself in the form of several views, where each view focuses on a particular aspect of the data.
There are currently six views:

1. ‘Overview’ view – shows experimental metadata.

2. Protein view – shows protein identifications 

3. Peptide view – shows peptides used to generate the protein identifications

4. Spectrum view – shows spectra and chromatograms

5. Quantification view – show quantitative data for both proteins and peptides

6. ‘Summary charts’ view – provides data chars for assessing data quality

To enable maximum reusability, each view is implemented as an independent component using [Java Swing](http://download.oracle.com/javase/tutorial/uiswing/).
This way, more views can be added easily in the future.

[Inspector-mzgraph-browser](https://github.com/PRIDE-Toolsuite/inspector-mzgraph-browser), the component responsible for visualizing spectra and chromatograms,
is released and available as self-contained Java library and distributed as part of the PRIDE Inspector. Both this component and the statistical charts in the
‘Summary Charts’ view, are implemented using the [JFreeChart](http://www.jfree.org/jfreechart/) API.

Next to the previous six layers, a generic application management framework maintains the context and information shared by the whole environment.
It consists of features frequently required by medium or large Java Swing based applications, such as: lifecycle services for background tasks, in-memory caching,
event bus, user property management and error handling. The framework is independent from the PRIDE Inspector and therefore can be reused for other rich
client applications.

## Visualising Peptide/Protein Information

### PSMs

The ‘Peptide View’ tab includes the information at PSM level for every peptide. The Peptide Table panel shows for each peptide the list of PSMs with
the corresponding scores from the search engines, the list of modifications, Precursor charge and precursor mass. In the example ech PSM contains the 
information of the OMSSA and XTandem Score, also the table provides the information of the peptide sequence length; start and end position in the protein
sequence. 

![PSMs Information](/static/markdown/prideinspector/files/peptideTable2.png)

### Peptide Information

The Peptide Table also provides the information about each protein identified in the file. It provides information about the peptide sequence, 
Protein identifier, sequence length, isoelectric point, number of PSMs, and modification summary.

![Peptide Table](/static/markdown/prideinspector/files/peptideTable.png)   

### Protein Information

The protein panel shows all the information about identified proteins: protein level scores, protein sequences, protein identifier, number of 
PSM for each protein, modifications and number of unique peptides. The first column is a three table structure when the protein inference 
is provided (![](/static/markdown/prideinspector/files/plus.png)), if the use 
click in the sign the group is collapsed. 

![Protein Table](/static/markdown/prideinspector/files/proteinTable.png)

Finally, the sequence coverage is shown in a column for each protein: 

![Protein Sequence coverage](/static/markdown/prideinspector/files/coverage.png)

## PRIDE Inspector metadata

PRIDE Inspector ‘Overview’ panel: ‘Experiment General View’. The tab contains basic metadata information about an experimental file: experiment and project titles,
contact information, software used for the file generation, and original file format, amongst others.

![General Experiment Data](/static/markdown/prideinspector/files/metadata1.png)

PRIDE Inspector ‘Overview’ panel: ‘Sample & Protocol View’. This tab contains metadata information about the sample (species, tissues, etc) and the
experimental protocol.

![](/static/markdown/prideinspector/files/metadata2.png)

PRIDE Inspector ‘Overview’ panel: ‘Instrument & Processing View’. This tab contains metadata information about the instrument configuration and software used.

![](/static/markdown/prideinspector/files/metadata3.png)

PRIDE Inspector ‘Overview’ panel: ‘Identification Protocol View’. This tab contains metadata information about the peptide/protein identification protocols
such as search parameters, databases, search engines and software used.

![](/static/markdown/prideinspector/files/metadata4.png)

## Protein Sequence Panel 

In MS proteomics based experiments, potentially identified proteins are reported using the searched database’s proprietary identifiers. These
identifiers are unstable and can change or may even be deleted over time. The latter happens if, for instance, hypothetical proteins are removed when
gene prediction algorithms are updated or new biological evidence is created.

A few years ago we investigated the impact of changing protein identifiers on stored proteomics data over time. We found that in several cases 10-20% of
the reported identifiers were no longer valid after only a year after the experimental results had been published. To highlight this problem to the user as
well as to keep the reported data usable, PRIDE Inspector Toolsuite has a function to automatically check the reported protein identification’s status.
To do this we integrated specific components that access the identifications source database and retrieve the current identifier status. 

If the identifier was only updated, the new accession is automatically displayed in the protein table and the updated sequence retrieved. In some cases, even though a protein’s identifier did not change its underlying sequence was altered in the protein sequence database. Therefore, PRIDE Inspector automatically fetches a protein’s current sequence and checks whether the reported peptides still fit this identification.

![Protein Sequence Status and Update](/static/markdown/prideinspector/files/proteinSequence.png)

When using the **Obtain Protein Details** feature in the PRIDE Inspector, the status of the protein according to the original database is downloaded
in addition to the protein name and protein sequence. It could be one of the following cases:

     - Active: the protein still exists in the original database, and the details remain unchanged.
     - Unknown: the protein does not exist in the original database.
     - Deleted: the protein has been removed from the original database.
     - Merged: the protein has been merged with other proteins to form a new protein.
     - Demerged: the protein has been split into two or more proteins.
     - Changed: there have been some changes on this protein, but the type of the change is unknown.
     - Error: there is an error associated with this protein.

To summarize, there are three main results for a protein’s status: active, changed, and deleted. For UniProtKB (UniProt KnowledgeBase) changed
identifiers are subdivided in merged and demerged identifiers. The main reason for the demerging of identifiers is that new identifiers were created 
for every species a protein was identified in as well as new identifiers for the various genes a protein can come from. The merging of identifiers
mainly happens when based on new gene prediction algorithms proteins that were previously believed to be distinct are then considered to actually
come from the same gene. The International Protein Index (IPI) database was discontinued in September 2011. Therefore, PRIDE Inspector 
can only report whether a given identifier was still active in the last IPI release but cannot report on changed or deleted identifiers.

## How to perform protein inference 

The PRIDE Inspector provides as home screen were the user can select the option of opening the identification file, PRIDE XML, 
mzIdentML or mzTab:


![PRIDE Inspector Home Page](/static/markdown/prideinspector/files/option.png "PRIDE Inspector Home Page")

If the user provides an mzIdentML without protein inference information the tool will popup a message to run the protein inference algorithm:


![Protein Inference option](/static/markdown/prideinspector/files/inference.png "Protein Inference option")

When the algorithm finish the protein panel shows the list of identified proteins, including the new protein groups and the proteins than bellows to them, the "Show Protein Inference Option" provides a new popup with the protein inference visualisation:   

![Protein Visualisation Panel](/static/markdown/prideinspector/files/proteins.png "Protein Visualisation Panel")

The final aim of the pride-protein-inference library and PRIDE Inspector tool is to show and present the inference information to the final users. Especially the information for each group and the number of PSMs and peptides shared by interested proteins can be seen using the Protein Inference Visualisation:

 
![Protein Inference Visualisation](/static/markdown/prideinspector/files/viz.png "Protein Inference Visualisation")

## Protein inference Panel 

Detailed protein inference information can either be included or not in mzIdentML and mzTab files. In mzIdentML, this information is detailed if
‘Protein Groups’ are reported. The ‘Protein inference panel’ shows the identified proteins and the peptides and PSMs included in a particular protein
group. The panel can be used to select the proteins and show the identified peptides and PSMs with the corresponding scores and metadata (e.g. 
modifications, sequence). The ‘score threshold panel’ enables filtering by PSM score and therefore, to remove evidences below a particular score
threshold. The ‘Protein inference panel’ also enables to see the shared peptides and PSMs between the proteins that belong to a particular protein group.

The visualisation is composed of nodes, representing either proteins/accessions (rectangular, green), peptides (orange, rounded corners),
PSMs (light blue, rounded corners) or just connecting nodes (blue circles). The color and thickness of the edges as well as whether a shape is
filled and the filling color describes the relation to the selected protein.

A selected protein (or protein group) is highlighted by a red border and is filed in dark green. All proteins, which have regarding to the set PSM 
score filter exactly the same PSMs (and thus peptides), are also filled in dark green and have a black border. All peptides belonging to the selected
protein are filled in vivid orange, the PSMs in vivid light blue, both also with black borders. Proteins, which are sub-proteins (i.e. all PSMs 
are also contained in the selected protein) are filled in pastal green without border. Super-proteins (which contain every PSM/peptide of the selected)
are also in pastel green with dark green border, and “siblings” (having the same super-proteins) are in pastel green with black border. Peptides 
and PSMs, which are not contained in the selected but in a super-protein, are filled in pastel with a dark border. Proteins, peptides and PSMs, 
which have no relation to the currently selected, but are not filtered out, have a thick dark border and no filling. If a PSM, peptide or even 
protein is filtered out due to the score threshold, the corresponding node has no filling and a thin, black border.

![Protein Inference Panel](/static/markdown/prideinspector/files/proteinInferencePanel.png)

The ‘protein inference panel’ has options for node picking and transforming and also zoom in and out functionality are enabled. Different colours
and shapes are used for proteins (green rectangle), peptides (orange rectangle), PSMs (blue rectangle) and protein groups (blue circles).
