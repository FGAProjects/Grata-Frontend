export function dynamicSort(property) {
    
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder === -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

export function getSectorInProject(sectors, currentProject) {

    let sector_name = '';

    for(let aux = 0; aux < sectors.length; aux ++) {
        if(currentProject.sector === sectors[aux].id) {
            sector_name = sectors[aux].name;
            break;
        } else {

        }
    }

    return sector_name;
}

export function size(obj) {
		
    var size = 0, key;
    
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

export function getUsersInSector(users, sectors, currentProject) {

    let dataSourceUsers = {
        innerArrayUsers: [

        ]
    }

    for(let aux = 0; aux < users.length; aux ++) {
        
        if(users[aux].is_administrator === true) {
        
            for(let auxSector = 0; auxSector < sectors.length; auxSector ++) {
        
                if(users[aux].sector === sectors[auxSector].id 
                    && users[aux].sector !== null 
                    && users[aux].sector === currentProject.sector) {
        
                        dataSourceUsers.innerArrayUsers.push({

                            key: users[aux].id,
                            name: users[aux].name,
                            username: users[aux].username
                        }
                    );
                }
            }
        } else {

        }
    }

    return dataSourceUsers.innerArrayUsers;
}