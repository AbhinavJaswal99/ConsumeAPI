using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPIMake.Models;

namespace WebAPIMake.Controllers
{
    public class ProductsController : ApiController
    {
        abhinav_testEntities db = new abhinav_testEntities();

        [HttpGet]
        public IEnumerable<tblCustomer> GetCustomers()
        {
            return db.tblCustomers.ToList();
        }

        [HttpGet]
        public tblCustomer GetCustomer(int id)
        {
            var cust = db.tblCustomers.SingleOrDefault(x => x.CustomerId == id);

            if (cust == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return cust;
        }



        [HttpPost]
        public tblCustomer CreateCustomer(tblCustomer Customer)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }

                db.tblCustomers.Add(Customer);
                db.SaveChanges();

                return Customer;
            }
            catch (Exception)
            {

                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

        }

        [HttpPut]
        public void UpdateCustomer(int id, tblCustomer Customer)
        {
            if (!ModelState.IsValid)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            var cust = db.tblCustomers.SingleOrDefault(x => x.CustomerId == id);

            if (cust == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            cust.CustomerName = Customer.CustomerName;
            cust.Email = Customer.Email;
            cust.AlternateNumber = Customer.AlternateNumber;
            cust.Address = Customer.Address;
            cust.Phone = Customer.Phone;

            db.SaveChanges();
        }

        [HttpDelete]
        public void DeleteCustomer(int id)
        {
            var cust = db.tblCustomers.SingleOrDefault(x => x.CustomerId == id);

            if (cust == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            db.tblCustomers.Remove(cust);
            db.SaveChanges();
        }
    }
}
