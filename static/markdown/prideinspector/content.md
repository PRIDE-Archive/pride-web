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
