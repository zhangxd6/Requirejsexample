using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;
using WebApi2Sample.Models;

namespace WebApi2Sample.Controllers
{
    public class Products2Controller : ApiController
    {
        private static readonly List<Product> Products = new List<Product>()
        {
            new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
            new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
            new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M }
        };

        // GET api/products2
        [Route("api/products2")]
        public IEnumerable<Product> Get()
        {
            return Products;
        }

        // GET api/products2/5
        [Route("api/products2/{id}")]
        //[Authorize]
        public IHttpActionResult Get(int id)
        {
            var product = Products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST api/products2
        [Route("api/products2")]
        public IHttpActionResult Post([FromBody]Product value)
        {
            var maxId = Products.Count == 0 ? 0 : Products.Max(p => p.Id);

            value.Id = ++maxId;
            Products.Add(value);
            return Ok(value.Id);
        }

        // PUT api/products2/5
        [Route("api/products2/{id}")]
        public IHttpActionResult Put(int id, [FromBody]Product value)
        {
            var product = Products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = value.Name;
            product.Category = value.Category;
            product.Price = value.Price;

            return Ok(product.Id);
        }

        // DELETE api/products2/5
        [Route("api/products2/{id}")]
        public IHttpActionResult Delete(int id)
        {
            var product = Products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            Products.Remove(product);
            return Ok();
        }
    }
}