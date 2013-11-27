using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using System.Web.Http.Validation.Providers;

namespace WebApi2Sample.Models
{
    [DataContract]
    public class Product
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public string Category { get; set; }

        [DataMember]
        public decimal Price { get; set; }

        [JsonIgnore]
        public string ProductCode { get; set; }
    }
}