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

export function getSectorName(sectors, sectorId) {

    let sector_name = '';

    if(sectorId === null) {
        sector_name = 'Não Possui Setor no Momento';
    } else {
        for(let aux = 0; aux < sectors.length; aux ++) {
            if(sectors[aux].id === sectorId) {
                sector_name = sectors[aux].name;
            }
        }
    }
    
    return sector_name;
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
                    dataSourceUsers.innerArrayUsers.push(
                        {
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

export function getMeetingInProject(meetings, users, currentProject, name_user, sectors) {

    let dataSource = {
        innerArray: [
            
        ]
    }

    for(let aux = 0; aux < meetings.length; aux ++) {
        for(let auxUsers = 0; auxUsers < users.length; auxUsers ++) {
            if(users[auxUsers].sector === meetings[aux].place &&
                users[auxUsers].sector === currentProject.id) {
                
                name_user = users[auxUsers].name;
                dataSource.innerArray.push(
                    {
                        key: meetings[aux].id,
                        title: meetings[aux].title,
                        initial_date: meetings[aux].initial_date,
                        final_date: meetings[aux].final_date,
                        initial_hour: meetings[aux].initial_hour,
                        final_hour: meetings[aux].final_hour,
                        sector: sectors[meetings[aux].place - 1].name,
                        meeting_leader: name_user,
                        tags: [meetings[aux].status]
                    }
                );
                break;
            } else {

            }
        }
    }

    return dataSource.innerArray;
}