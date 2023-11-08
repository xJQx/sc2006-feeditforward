import { Hawker } from "../schemas/hawker";

export const hawkersData: Hawker[] = [
  {
    user_id: 3,
    user: {
      user_id: 3,
      name: "Jane",
      role: "Hawker",
      email: "jane@gmail.com",
      contact_number: "62671571",
      address: "60 Nanyang Cres, Blk 20A #03-02, Singapore 636957",
      profile_picture:
        "https://lh3.googleusercontent.com/p/AF1QipMTNLIY1JY3IsAQm5PVoY379BayeFqvaO4e3KRp=s680-w680-h510"
    },

    hawker_id: 3,
    business_name: "A Hot Hideout",
    food_type: "Modern Mala",
    operating_hours: "9am - 5pm",
    overall_rating: 4.4,
    geometry: {
      type: "Point",
      latitude: 1.35397,
      longitude: 103.68779
    },
    is_registered: true
  },
  {
    user_id: 4,
    user: {
      user_id: 4,
      name: "James",
      role: "Hawker",
      email: "james@gmail.com",
      contact_number: "6747OOOO",
      address:
        "76 Nanyang Drive, N2.1, #02-03, Nanyang Technological University, 637331",
      profile_picture:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFRUYGRgYGhkZGhgaGhwZGB4aGhwaGRgcGBgcITAlHCMrHxwZJjgmKy8xNTU1GiU7QDs0Py40NTEBDAwMEA8QHxISHzQsJCw2MTQ0MTQxNDQ0NDQ0NDQ0NDQ0NDY0MTQ0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NP/AABEIALIBHAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAECBAYDB//EAEEQAAIBAwIDBQYDBQUJAQEAAAECEQADIQQSBTFBBiJRYXETMoGRobFCwdEUI1JyshVigpLwFiQzNEOiwuHxUwf/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAApEQACAgICAQMDBAMAAAAAAAAAAQIRITEDEkEyUWEEInETobHBFEKB/9oADAMBAAIRAxEAPwC9VHjK9wN/CQfkf/Yq/FRu2gylTyNMRm2t5jwdvkV/WuL8PLqAVJhQBkjI9DmtGdEOmPhTNpm9aSiKzM/7Pt0dYBHdgrgkCQs55zBIq1Y4IiMFdmYe0uoQO4sIs7lC5+BJGaMmww8fhSafxA8ng9ZdYJn5VQWC7WmUJhFE2LMwABvuOV3AdDEcqP8A4j5Y/wBfSqQs5WMrvsr6KilyT/iFXrXU+J+2PypDJUqelSAQpU9I0ANTU9NQAqQp6QpAdEradnhb9mPd3dZifKKxSmrdrUEcjSdlI2fF3ti227bMGIiZ6Vgr3OrV3Uk8zVNzQgZzNRqRpopkjGmp6aKAGpqlTUDI0qelFAEaaKnFNFAEaapxS20CIRSiplaaKAIxUIqZpooGi7FPFdGWqOp0gLFlXPkSvnmDn1qxFmnqtYtuBkn0OSPj1qyKVgNSIp6UUAQ2Dwp1WKlFKKAGp4pwKUUgGpqkaagCMUoqVNSAalSZoE5+GTTI8iYI8jg0DJipTUaVADk1A05NMTQMiaanpjQIRpqelQA1NTmmoAalSpUAKlFPTgUAJEmien4PccSEJHpUeFuiMGddwGYPKtNe7TKB3Vz5nH0qWx0ZLWaQoYYQfCqTUQ4lrGusWPM/6FUCKEDRzimiugWpezp2Og3r0QsWTAPTwoeRXbfUDVIk5kUiKcimpiGpU9KgBqVPSpANSp4pGgCJpRT0qBjRSiiPD+HNdnaJjnyH3pcQ4Y1qNwieR5j6VNhQNpU5pqYDUqVKgY1NT00UANSpRSoAakaeKUUARpjUopRQFEaVPFNQFCp5jJpq5PYVveAPrn5A4FKx0cb/ABm2mFJc+CZ+v6TQ/UcS1LjuIyDyHe/zN+VGksgYAA9K6HTFhHKi0HVmdtX9Z1Kn+YL+WaJ6W5fPvIh/l3D70YscOHhPrRKzovKpckilBsGWbLHmsH1n8qtDSeVF7WkqwNMKzczRQM1FIiinD9CtwHdcVSOh61w4jofZmAysD1Uz8/Ct7MKKNQNdCKgaYiNKnNNQA1ODSpqAHpGmNNSGPTio1Td727CJtnqx5eeKVhQY0Wua2ZViKfV8Ua8O8xIBIyIyDBx8KpKx60hRQxGmpUqYDUqelUhQ0Uop4pRQFEYpwtSAqSiix0dbOjd/dUn0FcrloqYNGNHxl7aBBEDyzQ7U3GdizZJMmlY+pTK0xWu7ADmQJMZxk8hUhZo7B1KpWmirw0hPSgXFtb7Jym0lhE+GRIz6Gl2Q+rL9IMo5sonxIH3rK3dbcfrHp+tc7SHdJz5mhypFRhbN7p9NuyM+maIWdKKwljBBGPSrdziF1Qdtxxj+I1g+Q6Fwm6IRBLsqjxJA+9VX47ZWQgZyPAQPm0fSaxKXy2SSWH4iZJHmTmrthtxxz6j1ETWUpstcSWw3c4/cb3QqDy77fMiPpQ59Y5Mm5cnyYx8PD0qNrSuRyifHH/v/AOV1GhHV1kYPWD4TWbn8lfai+GimZpplMgGCPI8/jV/TCxt7+/d4rtj5GvTs82gY1CbugubiVusBJgbjyJkfpRq4BOOVcjTAFDSXh/1n/wCw/cVYsLcB7zFhnoo6iOQ8JFWzTUAKlSpUCGNNTgVa1PDriKGZWAPUilYy7w8acp+8Lh/KI8ooTfjcdvKceMdKjNRNIYqU01KgCVNTU4oAepKtNXSy+0g+BmgdCa2R0pttWuM8au3FCJbUx1wq+HPJPoBQm2+pjNtPhvn5GpsaRdVK6paNd9Bprhy4UeQmfvRezoqhyLUQQmmJqwmhJoybaIJYgDzMVUv8XRfdUt5+6vzOfpUOZooXo5JwyeY8DnyyKsjQqoliAB1OB86F3+K3W5MqD+6JPpLT8wBVF235Ylj0LEtHpPLrWbmWuJ+Qzd11hOR3nwQT/wB3u/WsL2jcPqGcLtBCwPQBZ+lHvZmOUf6/18qE8Wt98ea/+VEJNyCXRKk8gVbNQ05JBJ6GPrFWtMCS8mYYgekmqoubVYAT3m6x+L0roptNGPZJpnbQuTukzDQPSBV90lT6GhWhfLH+9P0FFtBGxyeUn+ha5+RU2dXHK0irpffX+YD5mtVZQAQBHpis5prUsp8CD9Qa1CgADPyBPzrm5XlBOMnomq1lu0XB7z3t9k3FDKC2zkXErJ89oUfCtYreCk/UfTlXSfID6/WojJx0iXxSeyubddLFsFgGMCcnyrBniLj/AKr/AOdv1rvp9ZfdtiXWLMDA3eAJPPyBr2bXscb437m41+nRY2OW8ZWKGX3CRM58ATy9KyLcS1QJHtGkdCEP3FdNPxzUggNtYeax9VpWhdJGl/ak8W/yP+ldUIIkVws6piMiu6uapNMl2KKaK6V106JPfLKDyKpuz55EU6FYm0DhRcK9w/irjdvMwALNA6SY8OVO7dBMVzIpUFkDTGpukgjx8DB+BFRW3Hj8ST96KHZGkBU9tWtFqTbmFRpEd5Q3ynlSYyjNXrWqti2VNuXMw+448O7yqmuid2lXgHkNo+5NE9LwJzlnx6AfOpbS2UotgyadHzEH16fCjR0Nlebbj4Ln68vrXG89tfdT4sfyH61D5ImkeKTKKvFOeJInM1W1CM89F6x3VHjJ/Wh132ajczggkxs75O0DdnA6jr1qHNMfXrthk9oIwqE+ZwKdeM3X67R/dx9TNcuGaVHRX2tmYDYIglcgcuVR9mJIAwDWTlbo1hTLK3Cx5mT1Mk/Op3iEUuxMKJgc8YxNRt2ciPEVbeyGG1hIIyI6Vm6DlfJhRRm34+hHcSe6rd8x3XKBYUdYcGMY86gms1FxHAEN+6I2Lt270LMRk7oJBiegGJrS2+HJzW2szMxJBPUdR4VZ/ZiJBKg+cAz5TT7rwjF8XJL1P9zN8E0l1SzXA24ooJLbyWDXGYjJ2jvKAP7vSuPHk76T4f8AlWsuWVGS33j5nFZvtKy702mYBnkczjkTWnFcp20KXCoLtdgbTrl/5j9zVG4MP/M/9ZohpiJaTlj8znkKpXRh/wCZ/wCo11RVSaM5O4p/Jy0n4vUfainBro23VYgZYyfJFoTYMbj/AC/nXFiQTtkySIkwZxkelZyg5Nm8eRQirN1wWxbZQwYMOpWXHjzUGi7vbU5IB82VT8iZ+lBeB9nQ9hGZyA09xQNohisCf5fCjFngltOQY+pP5Vl/iNvP8lv6peBn4naTltnyDMfoAPrXA8dHgfgoj+o/eiCcOQckX4ifvXT2A8B8q0X0iXsYv6k8yayu33hOMlxP+WJqWhu+zuI4dRtOTg90iG5+RPSpnSkAb/xLuEHbPpKferGmW4qH9w7KAQQZjvdZVJHiJMVvTWTPstHPiWicXmG9J6yVX5FiJ+VWdBwZi6lyoQZMMpJ8Ijziqt2zccDcWZhK9+SAgEiGIkZkR6UtFb1CyUR9oEkbSVAkiT/DkGk6u2h26pM1S6VRyNJ7C9Z+E/lVCxdYgE4Mcp5Ve0ql5JaFXLN0A/U9BVpxMmmWNNpV94yFHixE+SkgialqLpbu7m2D3VZt0fl9BVfU6vdhcKOQ/M+J9a5orNkHHiSAPmcUWgpnT2dSW1NQR1jLicjJCqPA7jz9MetXkthp3XkUHJS224T/ACic1EpxRcYSfg4fs6ruDkyOW2GE+ZBx9a6raZ02ADnO4KN3+YjNDuKa32NxFQyGGd6iZk+HSIq1Y4tdZlXawDfiRIRR4u8iPr0xWcuZI2jwurZct8HIy77R57R+Qp9XprKoxBZmCtEEgTByfGqmo/aGPcCGR79wsc+G1cn5121OlLIylmXlJU7SYyRnoeXpWf6jKUVlUZFNY6uy73EBZO8xnPjRJNU5L72dgiboJLcpPdBPOs1r3hz5r/5GPoK1PAddau3BbUM10r7giSFBJIJMcoNLki7waQlcMYZz0/EbjsmzTvsZhud5WFkAnbA6T16UTuWcnw5/SiV/S3FUt7E4BMFgzGOgVZk+VW7XDLjDbuRARGFLEfHFHST0qIjJRdydmb3gIyEbpkHphhH61QRLNoAbUUKTG8y0nnG4/lWsudjVj/iFmkTvkrE97BJ6TV2x2X06e6n12/0xVriIc4t2YscQHIFyOQ9mjx81EVPSarvCbb7ZyWKL/wBoJP0raanglo7YUDawblMx0O6cVxu6YDkIHlVx4EyZc/XSBP7Yg91G/wAQJHzEVB+JN0SPWD9oP1q3dtVWa1Wi+lijN/VSZVfWXD4Af5v6hXIPcPNz6DA+UxV32XlUGKr7zKPUgVa4Iol88iqmmnnJ/wBeVDePWtpTHMN9xRj+0dOvvX7K+txB+dCe0GutXSnsriPtDBtjBgJ2xJHoflR0jHSF3lLbBCmCD4VXucmPiWPzJNdzXK5yPpSrNi7YopqY3Dxj6TVnRWfxH4frXKzb3HyoglXGPkJSbVHoPZpJ01v/AB/1vRFkrK9muPlXtaU2TDbyLu7unDvAXbnkR71aT+0EMxux5fqaKyLwSKU2yuba1f4W+g/Oo/tX90/MfpVEGP1WleLUAk7Z5ZwEAq5obBcbz7wbxmCsAfblQztD7tmP4T9kqOk4q1m1bRQp3G4TJiIIjp1moddU0Ur7Ow+2hHMqPXkfpTJpishSQGBBE8wYJH0HyrP3O1LK7IQAVMEljtkhWAB5e6wPyqxruPi0GL3ACoDBO4WPLkmCZJ8Rz5is5SSrBcYtrYU/YhU20527J7szHSeU1n+Fdrw6AG2z3FUbhaRjubO8APCqAIOTJg+hJ63tJp7T7HLCFksFLANg7GVZYMAyk92ACM5phkK6bQowBYDw+Vdr+jVjnMY8gPIdKEaXjCX7NwoVhGAkMrSpI2v3SdoOcNB7pxQx+PewFx8QhRXJkgB52wFyTO35mspSblSRcY0rsJ9pNGqWdyYKy3ryX486fs4gvKWAIIO0yYU5kERM4A5isXo+LPfe64tHbcQM5nuqxg7Vkd4kqQMiYOcVp+y/GktF1eFQ7D7TcpQMx2qmDuJJ8oxTXGpeor9SUVSH7XaUW2tAAQFMAcuoAox2Sse0sEu4DI+0AbQSoVSJkSTkifKsj2l7TrevoiITtlJkZO4xt6ZEHymKu9n+0dj2FyHcEHuQgJdygkIhYElMEkwuRmqfHFOqEuSdYPQm01kCC0t4FmPzgwK4kWNu0AMxETtJnE++BHLz61mv9pV1F3TjTFQSw9otxG3hSqvtEMAGCk5lhMc80O7Q9pUsfu0YbgQJLeA24jC+6Mz1p/alhFJSbSbq15M9xFCXAH8I+5rU/wD8822rjtsLtsA7u2R3gMFiOlYt+LpFsuYZwBy84knoM1pexevtPccKS2NvdDyDIgjbkievlVuqszzo9R/a1ddygxE5ofqeNi2m5UnBY7iVAAE5Kq36edZ/U9oP2O6q6ksll0IVoDLv2hjugkjIcADPkRmrel43Yu2rN604ZCSm4ysMBBDBoKmR18uhobVYEk7yFP7dYmItjn1Y8o5YHOYBqlrON31ZhutIoZ1DMjnCsVXJcAzEGOtDH11skj2trEwFgn8AUA7pnEDHjXDU3it66zOEHtb6qz5XJbAGPA9eZ5GsZt1g3hFXlBP+09S21hetldykgW4lJG5Z3GD7wmrb68kcs9fD4ZrOf2qwZQoRwSqht0SSBiMiQTBz0qvxHtVbsuVeO6QH296CekAzNdEGqOXkTcqNFfuEjGD48/pXJgfH7fpVTTa9btpL1sqyNJnkREghgeRBwRVk7sSAMjqPX8qtt3ghJVkw3ap0S+5dC5OwKGgpCrbZsdDBInzrOjhpwYQTH1BboPAGjfbS5/vO0+6ArR/MFDfRBQb29r+BuX+jG76VnNu8GvHFVbOd/RsgBIEHEj/Xr8qJcE5P/h/OqBvWtsBG3Rz6TnPvfl/72nBNGhtH2pRmW2rLsIG0EOV3QRJMeB901MW3sc6WgYTUHGDUppqszHtJArsK4g10U1SEwnwZj+06XusBuuDdjYZt3MDPPnzH2xutKgzgfKsBwh/960vdbDuN0jb3kfEcwcfevQNMedKPkcvB3IqNImmmqsmjybiTGwiK917hjYkDeFkFgzZ3HMLtxhMVUFlPZG7cdWuKJKKrrAYDaHUKSGB5iZg+gHTiPCb+rVH06sqN3WfvKrgDBKqII5wTnnzxV/hXZBtQhW3fNt0XZd3EsjbVI7qA7lnBzyjlXOpWkjocFlmV4FxC3uuXLyozxu7yhgeQYhThYgDzDcsA1DU6hLzNcJCFjLEpuZgBtUJmBgDHxnFa3sx2ba0Lh3bd52OCEkbGdSAzPLBiQcRMCsFqYmR1zRSu0JSxVHpXZy9YGh2IyOO97RDtDbmwxdDJz0JkQABWZ4qt6y7lIZrpV2YjYxTaFUQGBIB3Zz7y0P0p9ii3ElXNm4f4iSXtJKjP8TH4eVBDfcsXLEsSZYkliYiSTk06tWF0zZDQXWtbVuotm6292WXGwjcUCASSWJbMRynnXXh/Cmvrd9qx9mVUEsSWJQ4Kj8BwJaOUQDzqt2T1z+zKexe6A7bdn4RCFpMjq89eZrTa8OUYKhQyMErnMnKiSIHWklToG2/JkW076a9vtW7oR1dWWCV2oVBJ67VbZ3jAIODVrhXErKl0K+0JKBY3sLZmEKlpCbQWjaepECiguundK72ZGl2gjJAC7I3QVZvxRjPOqa8PNtbl0lbZuBix3LuJEsqqjYBwSOR5fAUknlA1fkte00xupbdVABMADaBKnbkeLHPSgHENR+z6s7CGFsFAu1cBx3gxjvEE+XIDxob/AGsj3VcgoORbLkA8yYGY8hU+K3bDPvt94MSWMMpEnoGgHnNXN3ydv+fBMVSoMaTiQuXEdEVHSd5UwrYG1yfw4Bn0FceNWLd1023kLllLgGR3jEiCYgdM9OVC7IQbSk5uAS3vbIMSJIHLPr5V04fb3XLYjG6T0wAT94rCUfvtM7Y/fx58fwSt31IRdgcjAnnJHeA8B+lNqNALVu5tc81YdG7pBAkdfOoI6+1EGDDjbPgjAZ8wBXTXHcB1UxI8ZAIrY5LZfvatV0zre1dzUPcQBLJ3BUhhtfeWIwAYWBMAciaKdke1trQ2EssrNvb2jPbuBwobADrgqyhVBUA8pyTFYjVr3Q3h84PKc1NjvKICi7mCg7sCcSzRgedNJEtu6N92l4893U2xZvNbuKpNtgyvZdXWZIkgtkiCvMCOWSHZnXXxfP7ddDs9sotsokBwdyOfElQ0wOueQrB8P4DeuqHtlAole8W3SO8eQg5bmD5dK1nAuD3fao15ySi90gdRAGWWI5+fnWUrxTOiLjm14/cK8X1qK43NYt5fazJbXIIgiQJI5+PhXnd/ga2lR/arcVmggYDLEyCDn16bhVbtHrGuam6zcw5QeQUkY+Mn4mqehLMdoBOCQBJ5ZOPma2ik2r0YXS+T0rhNxG0zrZWEAckbive2mTtGDiPWM1a41xZ7BAWD+7Z13Fz3lxBBbOCKCdlyv7PzA3SGnx5H0rnxvidtoYLedFR1cqkFC8Ksl1EDPQ8+dHZXglxzkp6PVPr9Uq3FQFlILAP7qAtEBwJ5ifvU+OcH0+mvuu+4/cDhU27VwQVd+mV+o5107OcLX9p/d6j2boSO8oYMBuF1ZAOzAIBgnNHr3BSGNw3bLAFixd2TrJ3FkCz6xWHLy1VHX9LwQnfZ1R5giO5EAkmSMYxzit52LuXdl5bhY7URVJJkr+8xjLAFjk+PhXfRIthwrkbQ7QcMoEk7cYK5ifCivaK2VW3FsosmJQqDgHGIP/2tIfcrOfkSjPrv58AOaYmmmmY4rQgdblZx+07hztRdk4Bncfj0+VHVahLdlme7IMIzTH4s5IHx5UOVCSs3fZ/QPeOl1VtALYYuxZ++J3IyhAsETtIaepxWyS8EDMxgDJOT9BVHs5aCadLYIOzauOQiMD0mK7WrgJYKwJB6Gc8ulLtVhVtFzT6lbih0MqZzBHLBwRNdKpbm6k9OtD9bxAowHlPPzI/KqjlWTJ06Mu/a9hqjY2LstIWtlfaKxYquGAfbthm5gxAiKsantGyoz2tPF24QrOgBlJG/2p95yROcHzrN6+4rcUd7aAW9izLC2AgRFuNLeBDY6+ma2vDL9q6qOhRgqv3gBDHeoXd1MSckcvGa53h4OhaBvDuIs6b3UKzsxAXcggSmRuJGF5TORXl3F7bW7txB7qM0dYWe7k+RWvbGKB12kcoaBzggiY85rzftRo2fU68gZK6dV8O+9kA/9sfOjjio38uyGWtKRZ06s4GLaSwUFxJkgNExJHyHgKzf7TpkYRae5JyXfbzOSAgEn1o/2kYpYCKCZ2qT5KJ/KsYynwrRJPI+zWD0Lh72jp1RU02wP7z7y8hgSxKggkDlPPaJqPGOJGyjlG0aM7rtCI5d12AyQBjOO9ER5ilwHitpLVmVdiLey4o2jvKSF7/URmOkjzoL20CLdS4tl7bXFLne27dEKGVSBGB8cGs4t9gaTNL2ZV7iG4+qtMdzAj2RLqYXumVxyOCDzBBq7rrjpuU3gVIwFtAd0jO6SMzPIcqz/YHih/fh7RuBQLhZTBB907sgGQAeWNpmjuq4ruP/AAbUCYlSxHxLQflUyuwutGKTgKW4d9Q6hCG3rbysEQQNxMzFExp7F4A+2u3jBIdwFaJiAYmAZIB8aK29WoJ3JbzJAKAgQNx59MEwcYp31zASGVQPBUUR8BR2Y8FNOCb02p3BEBt2c9YETzPPxqnpOz11dRaV8CS+9QXXAiCYG3JH/ujug43dYFUeVChg0KeZcc+o7v1p04nqCRvcxnMbfqBSTleTSMusWl5MRxrs3qLW64yqybtpdGDKCWKgFTDDvCMrFRvsYREyFTc/XaAdonwHLn5Vttfba5bdW3OSyDEnAuowwOgmSfAVw4hbRbFy2O5aUbcLBuPzJnq2B4xI5DFbrWTHzSMDvMd3MAnlOP0ovwjh9q4bZW9aRmdQ6OWRtpaCEYyMjlB69K7adbdp0ZArEAiZLAhtwIIODIOcCotwO6l9mtozIjq6lckKSHUQDuwMFo6Ubw8DusrJqeLcRbRqihVdZKgLtAAABG3bg8/GiHCOL+2QXFRgOXMTyB/PxrH9odd7ZEGwqUZtw5jIjnz6eFGuxl39xE5B5dfdXpWLbSyaUmYztUANXficvuzzllVm+pNVuG6hUk7TvIZQ24gBWG1htHOQWHx8qNdqODX31Nx1SVdgVIZc4UcicHHWqOn7Oana7tZYIis7sWUQFVmON0nl0Fap2rM9MO8Hue0DWxc2HZghN4zJ6t3TPgJ86JP2Z1Ny09pdTpSHKks5uW27h3ARsIiYzPSsxwJGB3o207ivQ4AB6+tbrT3XgYU49D8x+lRKTT2NRvNBbV8Ot6azc1lwIXtoxBR12s4QhFJmSWPWCc145xHidy+264xbOByUfyryH38Sa23a9nexsRGMuu6IPdEty5nvBeleduCDBBB8Dg/KlxRrLd/0EpPRet8UuhNgc7RgTkgf3W5j8qP8F4xdug27tx7mzvIXYs2cMJJkgd351kpolwBiLwgEiGViBgAiQSfUCtaRDbNEuuh9hzJwY5RzE9fWP1q2zYoHqX2uIOfaGfjBEUWDY+FNFcsUmvwWtE4CTA3EnJ6AeHhma7LqjmD1oP7aAuee5Y+BIn4/erAb3vNiPzP5fOjZm1Qd0vF7gVkS4ULZDDbIbENDAhunSsJxCblxnuNNwmWO1UJPIkhVAnziirv31nlkfE5H2rP8XeL7+ZDcvHJjyofsNJ1Yc7K6XXH/AHjTMXW25Qo1yA0KpIZWMEEMPQ56VtdX2psWjF/93cYbihG8rBKEblkHKnrXnXBu02o0qslkrtZt5DLu7xCqYMg8lFc+L+31dz2xsuZVVG1Cy91QCQY6mW/xU00iWrPSG1mj3f8AJIw2x3pYkHO0hmIA8qI2ePKohNOiKBCqqooHjyWs+EzVgVjZtQTbjbkk7Vz6mB8Ky/Fke7dcsQFYW5AxJtsWWcTgsepooxqm4kk0rCil2iP7oebD7H/58aGabs812zadP+Jcd9oJgbVGB6kbmn0FWO1F2ERZ5yfiIA+9ajhloIdKo5Kzgemwr+dVHRMjO9iNDvuF3EWbR3NIkM4EqkesMemAD71abtCbOqAV0DQ24NOc4Meoir+s4VpraO6rtYsXZRcYbnPSCfE8gPhWQs6tt77jC4I9ZYGPktbcMOzbejPmn1S67OR1TaO637PCB1SVCrtMSORHjPLxqvo9d7SbTsED7zvA70uSxAbpk48MAVDjjFmQgEmCMCeR8vWhH7DdMtsbbHUEevOq5IxyiYSbSNRoOCIrHvP7Mk72dWWNyFMOwAMx8JonpeCaMDYNjbgF2tdWTAAGNwnkPlQgX2uW09o6M1u3t/eW2uMuRO1vaAHmMx0HgIq6TU2zd9nBYrBP7pVU5GAd5I5+FcbUvc6aj5ZrdZ2aREBS3s2kDDGAstg5O0DcT8Kr2+zFw53JBAiXY+OcA+VTudorx5OF8gq/cgmqH9ovyDsJMwp2iT5LFJqQlKOjRW+GMpww5z15QQRPTpWY4zwnWXnkoqouEQFGHmQNy/cVabi15gArmZyZgwFaefPMedDbN6+7sLl1wqgHaCFndIGQOWDy8Kce27Q3KKWgYvZLVzBZAAZBZgGnpMbvlJrU8O4c6pt1DpuV0dXtvnuEMFcNAMxGIwTQ1rCie85n+K5cb6FoFc7iFkCJGGUgY5hg2CeZmnlvYozj4Rp79pLm/wBqLdwMBsQjvqYgj2igMATB97xrH6/h6W3RrasgdFfaW3MpJYFQ4AJAj1rV6a3BQnpt/qk/equo0xbYsckAz5M1XpBabBGl1jlGV2Zh3YnJBnxOTj7UT1fGkW08o5R7bp3QuN6MBMsPH6VA8EY4DooMzzPMEY+dVuLcCvNa223Q7fw5BICkQvn61nlsu41vIB4JcGxBuG7e0ic/L4VsdG/2/OvO7OlcDayYz68+o+dE9Jqrqe47DyPeHyPL4USjbwwjKlk2usMqY6EE+mZrzntTpWW9vJlXAKnwgAFfz+NaWxx91w6A+amD/lP61Sv6i3qS9g93O62TzmJwPLII8PoQuLyOVSjRjhWn7OkG2fIx881ndVp2tsUcQy8/DyIPUGjPZljNwdIU/WPz+lbt4sySzQTv6VWO6MzPxqwBinNM1NEtt7KlkjcJ6eU/Su5ujkA0D0+JOcmaq8PP7xB4yPiQQPqRVjUrteHWMT1HTMEf6xVVZDZK0iOwDAkAyRlTjln18KMnTaJ4D6bI/EGJb4tIJ+dBLdpVO5G8fxbufU+Wa7LrGHvKD6GPoaia6tMqP3IJN2a0D5V3TwBJj6qfvXRtK6d20yFFAAJYTgCevjVFNYpGZHqP0qXt0/jWpw9grWgmvOpCnpVkbDNValSoAz3az/p+jfcVrdB7+m/nb+gUqVaR8ES0yhx9z+03BJiEx05N0qvwb3HPXfE9YziaVKtX6H+TnfqX4LN5j41SuUqVc7NIg+1+n9S1S4V/zT+i/dKVKn7mjNDw4SROcdc1qdPo7f8A+af5R+lKlUozYA1yAXSAABBwMfw1Vf339Lf3uUqVBp/qc7lQv/8AL3T1Ft4PX3DyNKlQtiRqLHur6fkKlqOXx/M0qVXLQy1oUB5gH1E1eW0o5KB8BSpVzFx0AO1dldgO0THOBPzrF3KelWkNFSOdDh/zNr+ZP6qelWqM/J37We8n8rfcUIsMRMGJGYxSpVUfSEvUy/w5juXPM5+Ro/SpU4j5PH4BHUfCjfa337f86/cU9KtI7OeRwUdxvSuz8hSpVHNpF8O2RHKoGlSrFGrP/9k="
    },

    hawker_id: 4,
    business_name: "North Spine Koufu - Cai Fan Store",
    food_type: "Cai Fan",
    operating_hours: "8am - 8pm",
    overall_rating: 3.8,
    geometry: {
      type: "Point",
      latitude: 1.34713,
      longitude: 103.68003
    },
    is_registered: true
  }
];
