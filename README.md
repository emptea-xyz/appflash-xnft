                <div className="item-name-box">
                  <div className="item-name">
                    {i.name.length > 8 &&
                      i.name[0] +
                        i.name[1] +
                        i.name[2] +
                        i.name[3] +
                        i.name[4] +
                        i.name[5] +
                        i.name[6] +
                        i.name[7] +
                        "..."}
                    {i.name.length <= 7 && i.name}
                  </div>
                </div>