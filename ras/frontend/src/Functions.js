export const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export const initDataTable = () => {
  let table = new DataTable('#DataTable');
    table.destroy();  
    setTimeout(() => {  
        table = new DataTable('#DataTable', {
            language: {
              url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Dutch.json',
              search: "",
              searchPlaceholder: "Zoeken"
            },
            dom: 'rt<"bottom"pl><"clear">',
            order: []
        });
    }, 300)
}