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

export function getSectorUser(sectors, sectorId) {
    
    let sector_name = '';

    for(let aux = 0; aux < sectors.length; aux ++) {
        if(sectorId == null) {
            sector_name = 'Não possui setor no momento';
        } else {
            if(sectors[aux].id === sectorId) {
                sector_name = sectors[aux].name;
            }
        }
    }

    return sector_name;
}