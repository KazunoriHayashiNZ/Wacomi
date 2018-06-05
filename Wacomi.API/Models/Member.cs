using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Wacomi.API.Models
{
    public class Member : UserBase
    {
        public string SearchId{ get; set;}
        //Private Profiles
        public string Gender { get; set;}
        public DateTime? DateOfBirth { get; set; }
        //Public Profiles
        public string Introduction { get; set;}
        public string Interests {get; set;}
        public int? CityId { get; set;}
        public City City { get; set;}
        public int? HomeTownId { get; set;}
        public HomeTown HomeTown {get; set;}
        //Friend
        public virtual ICollection<Friend> Friends{ get; set;}
        public virtual ICollection<FriendRequest> FriendRequestSent{get; set;}
        public virtual ICollection<FriendRequest> FriendRequestReceived{get; set;}
        //ClanSeek
        public virtual ICollection<ClanSeek> ClanSeekPosted{ get; set;}
        //Property
        //public ICollection<PropertySeek> PropertySeekPosted{ get; set;}
        //Blog
        public virtual ICollection<BlogPreference> BlogPreferences{ get; set;}

        //Private Message
        public virtual  ICollection<Message> MessageSent { get; set; }
        public virtual ICollection<Message> MessageReceived { get; set;}
        public virtual ICollection<BlackList> MyBlackLists { get; set; }
        public virtual ICollection<BlackList> NoAccessMembers { get; set; }

        //Dairy Topic
        // public ICollection<TopicLike> LikedTopic { get; set; }
        public virtual ICollection<TopicCommentFeel> TopicCommentFeels { get; set;}
        public bool BannedFromTopic{ get; set;}
        public int BannedCount{get; set;}
    }
}