using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Wacomi.API.Models
{
    public class TopicComment
    {
        public int Id{ get; set;}
        [Required]
        public int MemberId { get; set;}
        public Member Member{ get; set;}
        public string TopicTitle{ get; set;}
        [Required]
        [MaxLength(100)]
        public string Comment{ get; set;}
        public ICollection<TopicCommentFeel> TopicCommentFeels { get; set;}
    }
}