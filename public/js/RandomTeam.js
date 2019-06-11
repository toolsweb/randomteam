class RandomTeam
{
    constructor()
    {
        this.init();
    }

    init()
    {
        this.readTextFile("data.json", this.putInList);
        $('#create-groups').click(() => {
            var name_list = $('#names').val().trim();
            var groups_to_create = $('#groups').val();
            var name_list_array = this.trimSpaces(name_list.split('\n') );
            var shuffled_names = this.shuffleData(name_list_array);
            if (groups_to_create > name_list_array.length) 
                return;
            var final_groups = this.createArrayOfArrays(groups_to_create);
            this.createFinalGroups(final_groups, groups_to_create, shuffled_names);
            final_groups.reverse();
            final_groups.map((group, group_index) => this.appendFinalGroups(group, group_index));
        });    
    }

    putInList(text)
    {
        $('#names').val(() => '');
        var data = JSON.parse(text); 
        data.data.map((v) => $('#names').val((i, text) => text + v.name + '\n'));
    }

    readTextFile(file, callback)  {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = () => 
        {
            if (rawFile.readyState === 4 && rawFile.status == "200")
                callback(rawFile.responseText);
        }
        rawFile.send(null);
    }

    trimSpaces(array) 
    {
        array.map((string) => string.trim());
        return array;
    }

    shuffleData(array) 
    {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    createArrayOfArrays(number_of_arrays ) 
    {
        var array = [];
        for (var i = 0; i < number_of_arrays; i++) {
            var sub_array = [];
            array.push(sub_array);
        }
        return array;
    }

    createFinalGroups(final_groups, groups_to_create, shuffled_names) {
        var current_group_number = 0;
        while (shuffled_names.length > 0)
        {
            var popped = shuffled_names.pop();
            
            final_groups[current_group_number].push(popped);
            current_group_number++;
            if (groups_to_create == current_group_number) 
                current_group_number = 0;
        }
        $('#groupings-output').html('');
    }

    appendFinalGroups(group, group_index)
    {
        var names_string = '';
        group.map((person) => {
            person = person.split(':');
            var name = person[0];            
            if (name != null) {
                names_string += '<span>' + name + '</span> <br>';
            }
        });
        $('#groupings-output').append(
                '<div class="col-sm-3 group-panel-container">' +
                    '<div class="panel panel-primary">' +
                        '<div class="panel-heading text-center"><strong>Group '+ (group_index + 1) +' ( ' + group.length + ' members )</strong></div>' +
                        '<div class="panel-body">' +
                            names_string +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
    }
}

export {RandomTeam as default};

