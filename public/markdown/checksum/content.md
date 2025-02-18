## Compute checksum for files that will be submitted to PRIDE

In order to submit files to PRIDE, you need to compute `SHA-1` checksum for each file and save it in a file named `checksum.txt` in the same directory as the files you would like to submit. While the checksum.txt file is generated by the PRIDE Submission Tool (aka PX Submission Tool), you can also generate the file manually using the pride-checksum python package.

Importantly, before starting, you should make sure that **File names can't have any spaces or any special chars other than underscore(_) and hyphen (-)**. If you have any files with spaces or special chars, please rename them before computing checksum.

### Compute checksum using python script

- Requires: Python >=3.11
- `pip install pride-checksum` (https://pypi.org/project/pride-checksum/)

**Usage:**

`pride_checksum --out_path /path/to/save/computed_checksum/ --files_dir /dir_path/where/files/are/located/`

`python -m pride_checksum --out_path /path/to/save/computed_checksum/ --files_dir /dir_path/where/files/are/located/`

OR

`pride_checksum --out_path /path/to/save/computed_checksum/ --files_list_path /path/to/file/containing/list_of_files.txt`

`python -m pride_checksum --out_path /path/to/save/computed_checksum/ --files_list_path /path/to/file/containing/list_of_files.txt`

Sample `list_of_files.txt`:

```
/path/to/some/file1.xml
/path/to/some/file2.xml
/some/other/path/file3.tsv
```

Please make sure the list of files:

1. Doesn't contain any duplicate file names.
2. Doesn't contain any directories (only files are allowed)
3. Doesn't contain any hidden files.

*NOTE:* The name of the output file is always `checksum.txt` and if a file with same name already exists in the specified out_path, it will be overwritten.

### Manually

If you would like to use your own tool to create the `checksum.txt` file manually, please compute `SHA-1` checksum for the files you would like to submit to PRIDE and save it the following format:

`<File_name> <TAB> <checksum>`

Example:

`checksum.txt`
```
file1.xml   05d4f91ac810ffca80c095d134fc53ed7cbd8f42
file2.xml   6ba8669057033f5c36f14e7431b626e2d03e1b01
sdrf.tsv    a9f19466cdd8ec1d4a8d76034dda5af3c24c0d5e
```