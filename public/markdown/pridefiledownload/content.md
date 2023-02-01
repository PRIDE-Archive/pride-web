## Pride Data Download

Once your submission files have been published it will be publicly accessible to the users of PRIDE. Data download in PRIDE can be performed using multiple mechanisms: 

- **https download**: Data files are downloaded using https protocol. Each dataset folder is accessible via a unique URL (e.g. https://ftp.pride.ebi.ac.uk/pride/data/archive/2012/03/PXD000001/).
- **ftp download**: Data files are downloaded using FTP protocol. Each dataset folder is accessible via a unique URL (e.g. ftp://ftp.pride.ebi.ac.uk/pride/data/archive/2012/03/PXD000001/).
- **aspera download**: Data files are downloaded using aspera protocol. Each dataset folder is accessible via a unique URL.
- **PRIDE Streaming API**: Data files can be streamed using the pride-archive-downloader service (e.g. https://www.ebi.ac.uk/pride/ws/archive-file-downloader/swagger-ui/index.html). 

## Downloading Data using HTTPS

The most common way to download files is using https protocol. In the dataset page you can find the **Project FTP** link. This link will take you to the dataset folder in the FTP server. Also, you will find the **FTP** for each file in the dataset page.

![HTTP Download](../markdown/pridefiledownload/image/dataset-files.png)

The structure of each Project FTP folder is as follows:

    https://ftp.pride.ebi.ac.uk/pride/data/archive/<year>/<month>/<accession>

And the structure of each file is as follows:

    https://ftp.pride.ebi.ac.uk/pride/data/archive/<year>/<month>/<accession>/<filename>

Different tools can be used to download files using https protocol. For example, you can use the `wget` command line tool to download files. 

    wget https://ftp.pride.ebi.ac.uk/pride/data/archive/2012/03/PXD000001/TMT_Erwinia_1uLSike_Top10HCD_isol2_45stepped_60min_01.raw


## Downloading Data using FTP

The other most common way or easiest way to download files in bulk is using ftp clients. 

Concerning FTP client programs, we recommend using WinSCP (Windows only) or FileZilla (all OS). You can download one of them from these links:

- WinSCP : http://winscp.net/eng/download.php
- FileZilla: http://filezilla-project.org/download.php

Eg: Can traverse through browser https://ftp.pride.ebi.ac.uk/pride/data/archive/2018/04/PXD005011/
    or use ftp tools like filezilla 

    #### Filezilla
    Host:ftp.pride.ebi.ac.uk
    Path: pride/data/archive/<year>/<month>/<accession>
    Username can be empty or somecases explicitly provide username as "anonymous"

## Downloading Data using Aspera

Aspera is client-server protocol for fast, secure file transfer. It is a high-speed file transfer protocol that uses a client-server model to transfer files. It is designed to transfer large files over long distances. **Aspera is the faster way to transfer data from PRIDE database.**

### Aspera client Tool

The Aspera ascp command line client can be downloaded [here](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm%7EOther%20software&product=ibm/Other+software/IBM+Aspera+Connect&release=4.1.3&platform=All&function=all).

Download and install the installers specific to your machine. The location of the 'ascp' program in the filesystem:

- `Mac`: On the desktop go `cd ~/Applications/Aspera\ Connect.app/Contents/Resources/` there you'll see the command line utilities where you're going to use 'ascp'.
- `Windows`: The downloaded files are a bit hidden. For instance in Windows 7 the ascp.exe is located in the users home directory in: `AppData\Local\Programs\Aspera\Aspera Connect\bin\ascp.exe`
- `Linux`: It should be in your user's home directory, `cd /home/username/.aspera/connect/bin/` there you'll see the command line utilities where you're going to use 'ascp'.
 
Use the below command after you installed the client:

    ascp -TQ -P33001 -l 100M -i ~/Applications/Aspera\ Connect.app/Contents/Resources/asperaweb_id_dsa.openssh prd_ascp@fasp.ebi.ac.uk:/pride/data/archive/2017/05/PXD005207/CDPK1_TP_10_R5.raw ~/

**Important Note**: `~/Applications/Aspera\ Connect.app/Contents/Resources/asperaweb_id_dsa.openssh` is the  private key file provided after installing aspera, and `/pride/data/archive/2017/05/PXD005207/CDPK1_TP_10_R5.raw` is the public file path for the file. 

### Using Aspera Docker Image

Aspera client can be executed using the [IBM aspera client docker container](https://hub.docker.com/r/ibmcom/aspera-cli). A pre-requisite to use this container is to have docker installed in your machine [help here](https://docs.docker.com/install/).

The docker image can be downloaded from [here](https://hub.docker.com/r/ibmcom/aspera-cli/) using the following command:

    docker pull ibmcom/aspera-cli

To download one file the docker image can be executed using the following command:

        docker run -v /user/data/folder:/data  ibmcom/aspera-cli ascp -i /home/aspera/.aspera/cli/etc/asperaweb_id_dsa.openssh -TQ -P33001 prd_ascp@fasp.ebi.ac.uk:/pride/data/archive/2017/02/PXD004683/20150820_Haura-Pilot-TMT2-bRPLC06-2.raw  /data

**Important Note**: `/user/data/folder` is the local folder where the file will be downloaded. `/home/aspera/.aspera/cli/etc/asperaweb_id_dsa.openssh` is the  private key file provided after installing aspera, and `/pride/data/archive/2017/02/PXD004683/20150820_Haura-Pilot-TMT2-bRPLC06-2.raw` is the public file path for the file.

## Downloading Data using PRIDE Streaming API

PRIDE [Streaming API is a RESTful API](https://www.ebi.ac.uk/pride/ws/archive-file-downloader/swagger-ui/index.html) that allows users to download data from PRIDE database. 
The API only have one endpoint that can be used to download files. The endpoint is:

    https://www.ebi.ac.uk/pride/ws/archive-file-downloader/files/s3/<project accession>/<filename>

The API can be used to download files using the following commandline tool `wget`:

    wget https://www.ebi.ac.uk/pride/ws/archive-file-downloader/files/s3/PXD000001/TMT_Erwinia_1uLSike_Top10HCD_isol2_45stepped_60min_01.raw

## pridepy Python client 

The PRIDE Team has developed a [python client library](https://github.com/PRIDE-Archive/pridepy) for PRIDE Rest API, including functionalities for project and file search. The library can be used to download files from PRIDE database, detalis are provided [here](https://github.com/PRIDE-Archive/pridepy). 

## Benchmarks 

We have done some benchmarks to compare the different ways of downloading files from PRIDE database. The results are shown in the following plot: 

//TODO 

