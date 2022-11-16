last_version_number=$(npm show @moonbeam-network/$1 dist-tags.$2 | grep -Eo '[0-9]+$')
new_version_number=$(($last_version_number+1))
new_version=0.0.1-$2.$new_version_number

echo $new_version
