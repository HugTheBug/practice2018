if (!localStorage.getItem("photoPosts")) {
    let posts = [
        {
            id : "0",
            description : "description for id 0",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 0",
            photoLink : "http://via.placeholder.com/150x150",
            likes : ["Author 0", "Author 1", "Author 2"],
            hashTags : ["#one", "#three"],
        },
        {
            id : "1",
            description : "description for id 1",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 1",
            photoLink : "http://via.placeholder.com/250x250",
            likes : ["Author 1", "Author 2", "Author 3"],
            hashTags : ["#two", "#four"],
        },
        {
            id : "2",
            description : "description for id 2",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 2",
            photoLink : "http://via.placeholder.com/350x350",
            likes : ["Author 2", "Author 3", "Author 4"],
            hashTags : ["#three", "#five"],
        },
        {
            id : "3",
            description : "description for id 3",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 3",
            photoLink : "http://via.placeholder.com/450x450",
            likes : ["Author 3", "Author 4", "Author 0"],
            hashTags : ["#four", "#one"],
        },
        {
            id : "4",
            description : "description for id 4",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 0",
            photoLink : "http://via.placeholder.com/550x550",
            likes : ["Author 4", "Author 0", "Author 1"],
            hashTags : ["#five", "#two"],
        },
        {
            id : "5",
            description : "description for id 5",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 1",
            photoLink : "http://via.placeholder.com/650x650",
            likes : ["Author 0", "Author 1", "Author 2"],
            hashTags : ["#one", "#three"],
        },
        {
            id : "6",
            description : "description for id 6",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 2",
            photoLink : "http://via.placeholder.com/750x750",
            likes : ["Author 1", "Author 2", "Author 3"],
            hashTags : ["#two", "#four"],
        },
        {
            id : "7",
            description : "description for id 7",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 3",
            photoLink : "http://via.placeholder.com/850x850",
            likes : ["Author 2", "Author 3", "Author 4"],
            hashTags : ["#three", "#five"],
        },
        {
            id : "8",
            description : "description for id 8",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 0",
            photoLink : "http://via.placeholder.com/950x950",
            likes : ["Author 3", "Author 4", "Author 0"],
            hashTags : ["#four", "#one"],
        },
        {
            id : "9",
            description : "description for id 9",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 1",
            photoLink : "http://via.placeholder.com/1050x1050",
            likes : ["Author 4", "Author 0", "Author 1"],
            hashTags : ["#five", "#two"],
        },
        {
            id : "10",
            description : "description for id 10",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 2",
            photoLink : "http://via.placeholder.com/150x150",
            likes : ["Author 0", "Author 1", "Author 2"],
            hashTags : ["#one", "#three"],
        },
        {
            id : "11",
            description : "description for id 11",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 3",
            photoLink : "http://via.placeholder.com/250x250",
            likes : ["Author 1", "Author 2", "Author 3"],
            hashTags : ["#two", "#four"],
        },
        {
            id : "12",
            description : "description for id 12",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 0",
            photoLink : "http://via.placeholder.com/350x350",
            likes : ["Author 2", "Author 3", "Author 4"],
            hashTags : ["#three", "#five"],
        },
        {
            id : "13",
            description : "description for id 13",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 1",
            photoLink : "http://via.placeholder.com/450x450",
            likes : ["Author 3", "Author 4", "Author 0"],
            hashTags : ["#four", "#one"],
        },
        {
            id : "14",
            description : "description for id 14",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 2",
            photoLink : "http://via.placeholder.com/550x550",
            likes : ["Author 4", "Author 0", "Author 1"],
            hashTags : ["#five", "#two"],
        },
        {
            id : "15",
            description : "description for id 15",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 3",
            photoLink : "http://via.placeholder.com/650x650",
            likes : ["Author 0", "Author 1", "Author 2"],
            hashTags : ["#one", "#three"],
        },
        {
            id : "16",
            description : "description for id 16",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 0",
            photoLink : "http://via.placeholder.com/750x750",
            likes : ["Author 1", "Author 2", "Author 3"],
            hashTags : ["#two", "#four"],
        },
        {
            id : "17",
            description : "description for id 17",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 1",
            photoLink : "http://via.placeholder.com/850x850",
            likes : ["Author 2", "Author 3", "Author 4"],
            hashTags : ["#three", "#five"],
        },
        {
            id : "18",
            description : "description for id 18",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 2",
            photoLink : "http://via.placeholder.com/950x950",
            likes : ["Author 3", "Author 4", "Author 0"],
            hashTags : ["#four", "#one"],
        },
        {
            id : "19",
            description : "description for id 19",
            createdAt : new Date("2018-02-23T23:00:00"),
            author : "Author 3",
            photoLink : "http://via.placeholder.com/1050x1050",
            likes : ["Author 4", "Author 0", "Author 1"],
            hashTags : ["#five", "#two"],
        },
    ];

    localStorage.setItem("photoPosts", JSON.stringify(posts));
}

if (!localStorage.getItem("users")) {
    let users = [
        {
            name: "Author 0",
            password: "password0"
        },
        {
            name: "Author 1",
            password: "password1"
        },
        {
            name: "Author 2",
            password: "password2"
        },
        {
            name: "Author 3",
            password: "password3"
        },
        {
            name: "Author 4",
            password: "password4"
        },
    ];

    localStorage.setItem("users", JSON.stringify(users));
}