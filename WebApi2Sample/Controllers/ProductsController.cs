using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;
using WebApi2Sample.Models;

/*
 * Originally from http://bit.ly/zSrIcB but enhanced from there.
 *
*/

namespace WebApi2Sample.Controllers
{
    [RoutePrefix("api/Products")]
    public class ProductsController : ApiController
    {
        private static readonly List<Product> Products = new List<Product>()
        {
            new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
            new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
            new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M },
            new Product { Id = 4, Name = "Banana", Price = 0.59M }
        };

        // GET api/Products
        [Route("")]
        public IEnumerable<Product> Get()
        {
            return Products;
        }

        // GET api/Products/5
        [Route("{id:int}")]
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

        // POST api/Products
        [Route("")]
        public IHttpActionResult Post([FromBody]Product value)
        {
            var maxId = Products.Count == 0 ? 0 : Products.Max(p => p.Id);

            value.Id = ++maxId;
            Products.Add(value);
            return Ok(value.Id);
        }

        // PUT api/Products/5
        [Route("{id:int}")]
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

        // DELETE api/Products/5
        [Route("{id:int}")]
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

        [Route("SomeOtherMethodName")]
        [HttpGet]
        public IHttpActionResult SomeOtherMethodName()
        {
            return Ok("Consider it done.");
        }
    }
}