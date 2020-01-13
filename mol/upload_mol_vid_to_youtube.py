# upload_mol_vid_to_youtube.py
# why?: automate youtube marketing with videos of proteins
from pymol import cmd, util, movie
import os
DATASET_PATH = os.path.join(os.path.curdir(), "data")
PDB = "1E79"
TYPE = "cif"
LENGTH = 120
START_AFTER = 1


# import and prepare the molecule
cmd.delete('all')
path = os.path.join(DATASET_PATH,  f'{PDB}.{TYPE}')
# we load the target
if not os.path.exists(path):
    cmd.fetch(PDB, path=DATASET_PATH)
elif os.path.exists(path):
    cmd.load(path)
cmd.clip("near", 100000)
cmd.clip("slab", 100000)
cmd.clip("far", -100000)
cmd.unpick()
cmd.show("cartoon")
cmd.center()
util.cbc()
# make the movie
cmd.mset("1x"+str(30*LENGTH))
cmd.frame(1)
cmd.mview("store", object='AA')
# wait N seconds
cmd.frame(30*START_AFTER) 
cmd.mview("store", object='AA')
for axis in ['x', 'y', 'z']:
    cmd.rotate(axis, 360, object="AA")
    cmd.mview("store", object='AA')
    cmd.frame(30*2)
cmd.mview('interpolate', object='AA')
filename = f'{PDB}.mpg'
movie.produce(filename)
# convert mpg to mp4 with ffmpeg
ff = f"ffmpeg -i {filename} -preset slow -tune animation -crf 18 {PDB}.mp4"
os.system(ff)
# upload the movie

# delete the movie from disc

