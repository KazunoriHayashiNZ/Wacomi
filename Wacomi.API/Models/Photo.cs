using System;

namespace Wacomi.API.Models
{
    public class Photo
    {
        public int Id{get;set;}
        public int? AppUserId{ get; set;}
        public AppUser AppUser {get; set;}
        public string Url {get;set;}
        public string Description {get;set;}
        public DateTime DateAdded {get;set;}
        public string PublicId{ get; set;}
    }
}